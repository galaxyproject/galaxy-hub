import contextlib
import importlib.util
import io
import tempfile
import unittest
from pathlib import Path

from PIL import Image

SCRIPT_PATH = Path(__file__).with_name("check_pixels_identical.py")
SPEC = importlib.util.spec_from_file_location("check_pixels_identical", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)


def png(image: Image.Image, **options) -> bytes:
    buffer = io.BytesIO()
    image.save(buffer, "PNG", **options)
    return buffer.getvalue()


def sample(mode: str = "RGBA") -> Image.Image:
    image = Image.new(mode, (4, 4), (10, 20, 30, 255)[: len(mode)])
    image.putpixel((1, 1), (200, 100, 50, 128)[: len(mode)])
    return image


class SameImageTests(unittest.TestCase):
    def test_reencoded_image_with_same_pixels_passes(self):
        image = sample()
        self.assertTrue(MODULE.same_image(png(image, compress_level=1), png(image, compress_level=9)))

    def test_palette_reduction_with_same_colors_passes(self):
        image = sample("RGB")
        self.assertTrue(MODULE.same_image(png(image), png(image.quantize(colors=2))))

    def test_changed_pixel_fails(self):
        image = sample()
        changed = image.copy()
        changed.putpixel((0, 0), (11, 20, 30, 255))
        self.assertFalse(MODULE.same_image(png(image), png(changed)))

    def test_changed_alpha_fails(self):
        image = sample()
        changed = image.copy()
        changed.putpixel((0, 0), (10, 20, 30, 254))
        self.assertFalse(MODULE.same_image(png(image), png(changed)))

    def test_unreadable_file_fails(self):
        self.assertFalse(MODULE.same_image(png(sample()), b"not an image"))

    def test_dropped_icc_profile_fails(self):
        image = sample()
        self.assertFalse(MODULE.same_image(png(image, icc_profile=b"profile"), png(image)))

    def test_dropped_exif_fails(self):
        image = sample()
        exif = Image.Exif()
        exif[0x010E] = "description"
        self.assertFalse(MODULE.same_image(png(image, exif=exif), png(image)))

    def test_animated_image_fails_even_when_unchanged(self):
        image = sample()
        animated = png(image, save_all=True, append_images=[image.copy()], default_image=False)
        self.assertFalse(MODULE.same_image(animated, animated))

    def test_16_bit_change_fails(self):
        original = Image.new("I;16", (2, 2), 1000)
        changed = Image.new("I;16", (2, 2), 1001)
        self.assertFalse(MODULE.same_image(png(original), png(changed)))


class MainTests(unittest.TestCase):
    def test_restores_changed_file_and_reports_kept_saving(self):
        with tempfile.TemporaryDirectory() as tmp, contextlib.chdir(tmp):
            image = sample()
            original = png(image, compress_level=0)
            for name in ("kept.png", "lossy.png"):
                Path("orig", "img").mkdir(parents=True, exist_ok=True)
                Path("orig", "img", name).write_bytes(original)
            Path("img").mkdir()
            Path("img", "kept.png").write_bytes(png(image, compress_level=9))
            changed = image.copy()
            changed.putpixel((0, 0), (0, 0, 0, 255))
            Path("img", "lossy.png").write_bytes(png(changed, compress_level=9))

            report = io.StringIO()
            with contextlib.redirect_stdout(report), contextlib.redirect_stderr(io.StringIO()):
                MODULE.main(["orig"])

            self.assertEqual(Path("img", "lossy.png").read_bytes(), original)
            self.assertIn("`img/kept.png`", report.getvalue())
            self.assertNotIn("lossy.png", report.getvalue())


if __name__ == "__main__":
    unittest.main()
