import importlib.util
import io
import os
import shutil
import struct
import tempfile
import unittest
import zlib
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path
from unittest import mock

from PIL import Image, ImageCms, PngImagePlugin

SCRIPT_PATH = Path(__file__).with_name("optimize-images.py")
SPEC = importlib.util.spec_from_file_location("optimize_images", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)

SRGB_PROFILE = ImageCms.ImageCmsProfile(ImageCms.createProfile("sRGB")).tobytes()
ORIENTATION = 0x0112


def requires(binary):
    """Skip when the optimizer is missing, or fail when REQUIRE_OPTIMIZERS=1 (CI)."""

    def decorate(cls):
        if shutil.which(binary):
            return cls
        if os.environ.get("REQUIRE_OPTIMIZERS") == "1":

            def setUp(self):
                self.fail(f"{binary} is required when REQUIRE_OPTIMIZERS=1")

            cls.setUp = setUp
            return cls
        return unittest.skip(f"{binary} is not installed")(cls)

    return decorate


def write_raw_png(path, bit_depth, color_type, channels, size=(8, 8)):
    def chunk(kind, data):
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data))

    width, height = size
    row = b"\0" + b"\x12\x34" * channels * width
    header = struct.pack(">IIBBBBB", width, height, bit_depth, color_type, 0, 0, 0)
    path.write_bytes(
        MODULE.PNG_SIGNATURE
        + chunk(b"IHDR", header)
        + chunk(b"IDAT", zlib.compress(row * height))
        + chunk(b"IEND", b"")
    )


def load(path):
    with Image.open(path) as image:
        image.load()
        return image


def gradient(mode="RGB", size=(256, 256)):
    image = Image.new("RGB", size)
    image.putdata([(x, y, (x + y) % 256) for y in range(size[1]) for x in range(size[0])])
    return image.convert(mode)


class TempDirTestCase(unittest.TestCase):
    def setUp(self):
        temporary_directory = tempfile.TemporaryDirectory()
        self.addCleanup(temporary_directory.cleanup)
        self.root = Path(temporary_directory.name)

    def optimize(self, path, **kwargs):
        with redirect_stderr(io.StringIO()):
            return MODULE.optimize_file(path, **kwargs)


class ShouldReplaceTests(unittest.TestCase):
    def test_needs_five_percent_and_one_kibibyte(self):
        self.assertTrue(MODULE.should_replace(20480, 20480 - 1024))
        self.assertTrue(MODULE.should_replace(100000, 95000))
        self.assertFalse(MODULE.should_replace(100000, 95001))
        self.assertFalse(MODULE.should_replace(10000, 8977))
        self.assertTrue(MODULE.should_replace(10000, 8976))

    def test_never_replaces_with_a_larger_or_equal_file(self):
        self.assertFalse(MODULE.should_replace(10000, 10000))
        self.assertFalse(MODULE.should_replace(10000, 12000))


class CandidateTests(TempDirTestCase):
    def test_keeps_png_and_jpeg_in_any_case(self):
        names = ["a.png", "b.PNG", "c.jpg", "d.JPEG", "e.webp", "f.avif", "g.gif", "h.svg", "i.md"]
        for name in names:
            (self.root / name).write_bytes(b"x")

        found = MODULE.filter_candidates((self.root / name for name in names), self.root)

        self.assertEqual([path.name for path in found], ["a.png", "b.PNG", "c.jpg", "d.JPEG"])

    def test_drops_missing_files(self):
        self.assertEqual(MODULE.filter_candidates([self.root / "gone.png"], self.root), [])

    def outside_directory(self):
        outside = tempfile.TemporaryDirectory()
        self.addCleanup(outside.cleanup)
        return Path(outside.name)

    def test_drops_symlinks_and_files_outside_the_repository(self):
        outside = self.outside_directory()
        (outside / "secret.png").write_bytes(b"x")
        (self.root / "real.png").write_bytes(b"x")
        (self.root / "inside-link.png").symlink_to(self.root / "real.png")
        (self.root / "outside-link.png").symlink_to(outside / "secret.png")
        (self.root / "linked-dir").symlink_to(outside, target_is_directory=True)
        paths = [
            self.root / "real.png",
            self.root / "inside-link.png",
            self.root / "outside-link.png",
            self.root / "linked-dir" / "secret.png",
            outside / "secret.png",
            self.root / ".." / outside.name / "secret.png",
        ]

        found = MODULE.filter_candidates(paths, self.root)

        self.assertEqual(found, [self.root / "real.png"])

    def test_optimize_file_never_writes_through_a_symlink(self):
        outside = self.outside_directory()
        target = outside / "target.png"
        gradient().save(target, compress_level=0)
        original = target.read_bytes()
        link = self.root / "link.png"
        link.symlink_to(target)
        optimizer = mock.Mock()

        result = self.optimize(link, optimizer=optimizer)

        self.assertEqual(result.status, "skipped")
        optimizer.assert_not_called()
        self.assertEqual(target.read_bytes(), original)

    def test_changed_since_lists_added_and_modified_files_against_the_merge_base(self):
        completed = mock.Mock(stdout="a.png\0dir/b c.jpg\0")
        with mock.patch.object(MODULE.subprocess, "run", return_value=completed) as run:
            paths = MODULE.changed_since("abc123")

        self.assertEqual(paths, [Path("a.png"), Path("dir/b c.jpg")])
        self.assertEqual(
            run.call_args.args[0],
            ["git", "diff", "--name-only", "--no-renames", "--diff-filter=AM", "-z", "abc123...HEAD", "--"],
        )

    def test_all_lists_tracked_files(self):
        completed = mock.Mock(stdout="a.png\0b.webp\0")
        with mock.patch.object(MODULE.subprocess, "run", return_value=completed) as run:
            paths = MODULE.tracked_files()

        self.assertEqual(paths, [Path("a.png"), Path("b.webp")])
        self.assertEqual(run.call_args.args[0], ["git", "ls-files", "-z"])


class SkipTests(TempDirTestCase):
    def test_skips_animated_png(self):
        path = self.root / "anim.png"
        frames = [gradient(), gradient().rotate(90)]
        frames[0].save(path, save_all=True, append_images=frames[1:], compress_level=0)

        result = self.optimize(path, optimizer=mock.Mock())

        self.assertEqual(result.status, "skipped")
        self.assertIn("animated", result.reason)

    def test_skips_file_whose_content_does_not_match_its_extension(self):
        path = self.root / "photo.png"
        gradient().save(path, format="JPEG")
        optimizer = mock.Mock()

        result = self.optimize(path, optimizer=optimizer)

        self.assertEqual(result.status, "skipped")
        optimizer.assert_not_called()

    def test_skips_undecodable_file(self):
        path = self.root / "broken.png"
        path.write_bytes(b"\x89PNG\r\n\x1a\nnot really")

        result = self.optimize(path, optimizer=mock.Mock())

        self.assertEqual(result.status, "skipped")

    def test_skips_file_the_optimizer_rejects(self):
        path = self.root / "malformed.png"
        gradient().save(path, compress_level=0)
        original = path.read_bytes()
        error = MODULE.subprocess.CalledProcessError(1, ["optipng"], stderr=b"Recoverable errors found in input")

        result = self.optimize(path, optimizer=mock.Mock(side_effect=error))

        self.assertEqual(result.status, "skipped")
        self.assertIn("Recoverable errors", result.reason)
        self.assertEqual(path.read_bytes(), original)

    def test_skips_16_bit_png(self):
        path = self.root / "deep.png"
        Image.new("I;16", (64, 64), 1000).save(path)

        result = self.optimize(path, optimizer=mock.Mock())

        self.assertEqual(result.status, "skipped")
        self.assertIn("16-bit", result.reason)

    def test_skips_16_bit_rgb_and_rgba_png(self):
        for color_type, channels in ((2, 3), (6, 4)):
            with self.subTest(color_type=color_type):
                path = self.root / f"deep-{color_type}.png"
                write_raw_png(path, 16, color_type, channels)
                optimizer = mock.Mock()

                result = self.optimize(path, optimizer=optimizer)

                self.assertEqual(result.status, "skipped")
                self.assertIn("16-bit", result.reason)
                optimizer.assert_not_called()


class GateTests(TempDirTestCase):
    def write_original(self):
        path = self.root / "image.png"
        gradient().save(path, compress_level=0)
        return path

    def test_planted_pixel_change_keeps_the_original_and_fails(self):
        path = self.write_original()
        original = path.read_bytes()

        def damaging_optimizer(file_format, target):
            image = load(target).convert("RGB")
            image.putpixel((10, 10), (0, 0, 0) if image.getpixel((10, 10)) != (0, 0, 0) else (1, 1, 1))
            image.save(target, compress_level=9)

        result = self.optimize(path, optimizer=damaging_optimizer)

        self.assertEqual(result.status, "failed")
        self.assertIn("pixels", result.reason)
        self.assertEqual(path.read_bytes(), original)

    def test_dropped_icc_profile_keeps_the_original_and_fails(self):
        path = self.root / "image.png"
        gradient().save(path, compress_level=0, icc_profile=SRGB_PROFILE)
        original = path.read_bytes()

        def stripping_optimizer(file_format, target):
            load(target).save(target, compress_level=9, icc_profile=None)

        result = self.optimize(path, optimizer=stripping_optimizer)

        self.assertEqual(result.status, "failed")
        self.assertIn("icc_profile", result.reason)
        self.assertEqual(path.read_bytes(), original)

    def test_changed_rendering_chunk_keeps_the_original_and_fails(self):
        for kind, data, key in ((b"gAMA", struct.pack(">I", 45455), "gamma"), (b"sRGB", b"\x00", "srgb")):
            with self.subTest(key):
                path = self.root / f"{key}.png"
                info = PngImagePlugin.PngInfo()
                info.add(kind, data)
                gradient().save(path, compress_level=0, pnginfo=info)
                self.assertIn(key, load(path).info)
                original = path.read_bytes()

                result = self.optimize(path, optimizer=lambda fmt, target: load(target).save(target, compress_level=9))

                self.assertEqual(result.status, "failed")
                self.assertIn(key, result.reason)
                self.assertEqual(path.read_bytes(), original)

    def test_palette_conversion_with_identical_pixels_passes(self):
        path = self.root / "flat.png"
        Image.new("RGBA", (300, 200), (12, 34, 56, 255)).save(path, compress_level=0)

        def palette_optimizer(file_format, target):
            load(target).convert("RGB").convert("P", palette=Image.Palette.ADAPTIVE).save(target, optimize=True)

        result = self.optimize(path, optimizer=palette_optimizer)

        self.assertEqual(result.status, "optimized")
        self.assertEqual(load(path).mode, "P")

    def test_main_exits_non_zero_after_a_gate_failure(self):
        path = self.write_original()
        failed = MODULE.Result(path, 100, 50, "failed", "pixels differ")
        output = io.StringIO()
        with (
            mock.patch.object(MODULE, "optimize_file", return_value=failed),
            mock.patch.object(MODULE, "repository_root", return_value=self.root),
            mock.patch("sys.argv", ["optimize-images.py", str(path)]),
            redirect_stdout(output),
            redirect_stderr(io.StringIO()),
            self.assertRaises(SystemExit) as raised,
        ):
            MODULE.main()

        self.assertNotEqual(raised.exception.code, 0)
        self.assertEqual(output.getvalue(), "")


class ThresholdTests(TempDirTestCase):
    def test_small_saving_keeps_the_original(self):
        path = self.root / "image.png"
        gradient().save(path, compress_level=9)
        original = path.read_bytes()

        def tiny_optimizer(file_format, target):
            data = Path(target).read_bytes()
            Path(target).write_bytes(data[:-1])

        result = self.optimize(path, optimizer=tiny_optimizer)

        self.assertEqual(result.status, "unchanged")
        self.assertEqual(path.read_bytes(), original)

    def test_dry_run_reports_without_writing(self):
        path = self.root / "image.png"
        gradient().save(path, compress_level=0)
        original = path.read_bytes()

        result = self.optimize(
            path, dry_run=True, optimizer=lambda fmt, target: load(target).save(target, compress_level=9)
        )

        self.assertEqual(result.status, "optimized")
        self.assertLess(result.after, result.before)
        self.assertEqual(path.read_bytes(), original)


@requires("optipng")
class OptipngTests(TempDirTestCase):
    def assert_lossless(self, path, image):
        expected = image.convert("RGBA").tobytes()

        result = self.optimize(path)

        self.assertEqual(result.status, "optimized", result.reason)
        self.assertEqual(load(path).convert("RGBA").tobytes(), expected)

    def test_keeps_palette_with_partial_alpha(self):
        path = self.root / "palette.png"
        image = gradient().quantize(64)
        image.save(path, compress_level=0, transparency=bytes(range(0, 256, 4)))
        image = load(path)
        self.assertEqual(image.mode, "P")
        self.assertIn("transparency", image.info)

        self.assert_lossless(path, image)

    def test_keeps_grayscale_with_alpha(self):
        path = self.root / "gray-alpha.png"
        image = Image.merge("LA", (gradient("L"), gradient("L").rotate(90)))
        image.save(path, compress_level=0)

        self.assert_lossless(path, image)

    def test_keeps_pixels_and_icc_profile(self):
        path = self.root / "profile.png"
        image = gradient("RGBA")
        image.save(path, compress_level=0, icc_profile=SRGB_PROFILE)

        result = self.optimize(path)

        self.assertEqual(result.status, "optimized", result.reason)
        optimized = load(path)
        self.assertEqual(optimized.info.get("icc_profile"), SRGB_PROFILE)
        self.assertEqual(optimized.convert("RGBA").tobytes(), image.tobytes())


@requires("jpegoptim")
class JpegoptimTests(TempDirTestCase):
    def optimize_always(self, path):
        with mock.patch.object(MODULE, "MIN_PERCENT", 0), mock.patch.object(MODULE, "MIN_BYTES", 0):
            return self.optimize(path)

    def test_keeps_cmyk_pixels(self):
        path = self.root / "cmyk.jpg"
        gradient("CMYK").save(path, quality=95)
        before = load(path)

        result = self.optimize_always(path)

        self.assertEqual(result.status, "optimized", result.reason)
        optimized = load(path)
        self.assertEqual(optimized.mode, "CMYK")
        self.assertEqual(optimized.tobytes(), before.tobytes())

    def test_keeps_progressive_pixels(self):
        path = self.root / "progressive.jpg"
        gradient().save(path, quality=95, progressive=True)
        before = load(path)

        result = self.optimize_always(path)

        self.assertEqual(result.status, "optimized", result.reason)
        self.assertEqual(load(path).tobytes(), before.tobytes())

    def test_keeps_pixels_exif_orientation_and_icc_profile(self):
        path = self.root / "photo.jpg"
        exif = Image.Exif()
        exif[ORIENTATION] = 6
        gradient().save(path, quality=95, exif=exif, icc_profile=SRGB_PROFILE)
        before = load(path)
        pixels = before.tobytes()

        with mock.patch.object(MODULE, "MIN_PERCENT", 0), mock.patch.object(MODULE, "MIN_BYTES", 1):
            result = self.optimize(path)

        self.assertEqual(result.status, "optimized", result.reason)
        optimized = load(path)
        self.assertEqual(optimized.getexif().get(ORIENTATION), 6)
        self.assertEqual(optimized.info.get("exif"), before.info["exif"])
        self.assertEqual(optimized.info.get("icc_profile"), SRGB_PROFILE)
        self.assertEqual(optimized.tobytes(), pixels)


class MarkdownTests(unittest.TestCase):
    def test_table_lists_only_optimized_files_with_a_total(self):
        results = [
            MODULE.Result(Path("a|b.png"), 200000, 100000, "optimized"),
            MODULE.Result(Path("c.jpg"), 5000, 5000, "unchanged"),
            MODULE.Result(Path("d.jpg"), 3000, 3000, "skipped", "animated"),
        ]

        markdown = MODULE.markdown_report(results)

        self.assertIn("| Filename | Before | After | Improvement |", markdown)
        self.assertIn("| `a\\|b.png` | 195.31 KiB | 97.66 KiB | -50.0% |", markdown)
        self.assertNotIn("c.jpg", markdown)
        self.assertIn("**Total:** 195.31 KiB -> 97.66 KiB (-50.0%)", markdown)

    def test_escapes_control_characters_in_filenames(self):
        name = Path("evil\n| injected |\r`x`\u2028\u202e.png")

        markdown = MODULE.markdown_report([MODULE.Result(name, 200000, 100000, "optimized")])

        rows = [line for line in markdown.splitlines() if "evil" in line]
        self.assertEqual(
            rows, ["| `evil\\u000a\\| injected \\|\\u000d'x'\\u2028\\u202e.png` | 195.31 KiB | 97.66 KiB | -50.0% |"]
        )

    def test_empty_when_nothing_changed(self):
        self.assertEqual(MODULE.markdown_report([MODULE.Result(Path("c.jpg"), 5000, 5000, "unchanged")]), "")


class MainOutputTests(TempDirTestCase):
    def run_main(self, results, *extra):
        github_output = self.root / "github_output"
        github_output.write_text("")
        markdown = self.root / "report.md"
        self.stderr = io.StringIO()
        with (
            mock.patch.object(MODULE, "optimize_file", side_effect=results),
            mock.patch.object(MODULE, "repository_root", return_value=self.root),
            mock.patch.dict("os.environ", {"GITHUB_OUTPUT": str(github_output)}),
            mock.patch("sys.argv", ["optimize-images.py", "--markdown", str(markdown), *extra]),
            redirect_stderr(self.stderr),
        ):
            MODULE.main()
        return github_output.read_text(), markdown.read_text()

    def test_reports_changed_files(self):
        path = self.root / "a.png"
        path.write_bytes(b"x")

        output, markdown = self.run_main([MODULE.Result(path, 200000, 100000, "optimized")], str(path))

        self.assertEqual(output, "changed=true\n")
        self.assertIn("a.png", markdown)

    def test_reports_nothing_changed(self):
        path = self.root / "a.png"
        path.write_bytes(b"x")

        output, markdown = self.run_main([MODULE.Result(path, 5000, 5000, "unchanged")], str(path))

        self.assertEqual(output, "changed=false\n")
        self.assertEqual(markdown, "")

    def test_dry_run_never_reports_changes_to_commit(self):
        path = self.root / "a.png"
        path.write_bytes(b"x")

        output, markdown = self.run_main([MODULE.Result(path, 200000, 100000, "optimized")], "--dry-run", str(path))

        self.assertEqual(output, "changed=false\n")
        self.assertIn("a.png", markdown)

    def test_log_lines_escape_control_characters(self):
        path = self.root / "a.png"
        path.write_bytes(b"x")
        hostile = MODULE.Result(Path("x\n::error::injected.png"), 1, 1, "skipped", "bad\nname")

        self.run_main([hostile], str(path))

        lines = self.stderr.getvalue().splitlines()
        self.assertEqual(lines[0], "SKIPPED x\\u000a::error::injected.png: bad\\u000aname")
        self.assertFalse(any(line.startswith("::") for line in lines))


if __name__ == "__main__":
    unittest.main()
