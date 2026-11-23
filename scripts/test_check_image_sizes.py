import contextlib
import importlib.util
import io
import os
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from PIL import Image

SCRIPT_PATH = Path(__file__).with_name("check_image_sizes.py")
SPEC = importlib.util.spec_from_file_location("check_image_sizes", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)

GIT_ENV = {
    "GIT_CONFIG_GLOBAL": os.devnull,
    "GIT_CONFIG_NOSYSTEM": "1",
    "GIT_AUTHOR_NAME": "Test",
    "GIT_AUTHOR_EMAIL": "test@example.org",
    "GIT_COMMITTER_NAME": "Test",
    "GIT_COMMITTER_EMAIL": "test@example.org",
}


def image_bytes(size=(8, 8), fmt="PNG") -> bytes:
    buffer = io.BytesIO()
    Image.new("RGB", size, (10, 20, 30)).save(buffer, fmt)
    return buffer.getvalue()


def git(*args: str) -> None:
    subprocess.run(["git", *args], check=True, capture_output=True, env={**os.environ, **GIT_ENV})


def commit_all(message: str) -> None:
    git("add", "-A")
    git("commit", "-m", message)


class CheckImageTests(unittest.TestCase):
    def test_small_image_is_ok(self):
        level, reasons, size = MODULE.check_image(image_bytes())
        self.assertEqual((level, reasons, size), ("ok", [], (8, 8)))

    def test_over_warn_size_warns(self):
        with mock.patch.object(MODULE, "WARN_BYTES", 10), mock.patch.object(MODULE, "ERROR_BYTES", 10**6):
            level, reasons, _ = MODULE.check_image(image_bytes())
        self.assertEqual(level, "warning")
        self.assertTrue(reasons[0].startswith("over "))

    def test_over_error_size_fails(self):
        with mock.patch.object(MODULE, "WARN_BYTES", 10), mock.patch.object(MODULE, "ERROR_BYTES", 20):
            level, _, _ = MODULE.check_image(image_bytes())
        self.assertEqual(level, "error")

    def test_size_at_threshold_is_ok(self):
        data = image_bytes()
        with mock.patch.object(MODULE, "WARN_BYTES", len(data)):
            self.assertEqual(MODULE.check_image(data)[0], "ok")

    def test_long_edge_warns_even_when_small(self):
        level, reasons, size = MODULE.check_image(image_bytes((2501, 4), "JPEG"))
        self.assertEqual((level, size), ("warning", (2501, 4)))
        self.assertIn("long edge over 2500 px", reasons)

    def test_long_edge_at_limit_is_ok(self):
        self.assertEqual(MODULE.check_image(image_bytes((2500, 4), "JPEG"))[0], "ok")

    def test_unreadable_image_warns(self):
        level, reasons, size = MODULE.check_image(b"not an image")
        self.assertEqual((level, reasons, size), ("warning", ["dimensions unreadable"], None))


class MainTests(unittest.TestCase):
    def run_main(self, *argv: str) -> tuple[int, str]:
        out = io.StringIO()
        with contextlib.redirect_stdout(out):
            code = MODULE.main(list(argv))
        return code, out.getvalue()

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        stack = contextlib.ExitStack()
        self.addCleanup(stack.close)
        stack.enter_context(contextlib.chdir(self.tmp.name))
        git("init", "-q", "-b", "main")
        Path("keep.txt").write_text("base")
        commit_all("base")
        git("checkout", "-q", "-b", "pr")

    def test_flags_warn_and_fail_and_ignores_the_rest(self):
        Path("small.png").write_bytes(image_bytes())
        Path("wide.jpg").write_bytes(image_bytes((2600, 4), "JPEG"))
        Path("huge.PNG").write_bytes(image_bytes((8, 8)) + b"\0" * (MODULE.ERROR_BYTES + 1))
        Path("notes.txt").write_bytes(b"\0" * (MODULE.ERROR_BYTES + 1))
        Path("logo.svg").write_bytes(b"<svg/>" + b" " * (MODULE.ERROR_BYTES + 1))
        commit_all("add images")

        code, output = self.run_main("--base", "main")

        self.assertEqual(code, 1)
        self.assertIn("::error file=huge.PNG::", output)
        self.assertIn("::warning file=wide.jpg::", output)
        self.assertNotIn("small.png", output)
        self.assertNotIn("notes.txt", output)
        self.assertNotIn("logo.svg", output)
        self.assertIn(MODULE.HINT, output)
        self.assertIn("| Fail | `huge.PNG` |", output)
        self.assertIn("| Warn | `wide.jpg` |", output)

    def test_warning_only_exits_zero(self):
        Path("wide.jpg").write_bytes(image_bytes((2600, 4), "JPEG"))
        commit_all("add wide")
        code, output = self.run_main("--base", "main")
        self.assertEqual(code, 0)
        self.assertIn("::warning file=wide.jpg::", output)

    def test_clean_pr_passes_without_table(self):
        Path("small.png").write_bytes(image_bytes())
        commit_all("add small")
        code, output = self.run_main("--base", "main")
        self.assertEqual(code, 0)
        self.assertNotIn("| Result |", output)
        self.assertIn("Checked 1 added or changed image(s); 0 flagged", output)

    def test_symlink_is_skipped(self):
        Path("target.txt").write_text("x")
        os.symlink("target.txt", "link.png")
        commit_all("add symlink")
        code, output = self.run_main("--base", "main")
        self.assertEqual(code, 0)
        self.assertIn("Checked 0 added", output)

    def test_unchanged_oversized_image_on_base_is_not_flagged(self):
        git("checkout", "-q", "main")
        Path("old.png").write_bytes(image_bytes() + b"\0" * (MODULE.ERROR_BYTES + 1))
        commit_all("old big image")
        git("checkout", "-q", "-b", "pr2")
        Path("other.txt").write_text("y")
        commit_all("unrelated")
        code, _ = self.run_main("--base", "main")
        self.assertEqual(code, 0)

    def test_pure_rename_is_skipped_but_changed_rename_is_checked(self):
        git("checkout", "-q", "main")
        big = image_bytes() + b"\0" * (MODULE.ERROR_BYTES + 1)
        Path("old.png").write_bytes(big)
        Path("old2.png").write_bytes(big + b"1" * 50_000)
        commit_all("old big images")
        git("checkout", "-q", "-b", "pr3")
        git("mv", "old.png", "new.png")
        commit_all("pure rename")
        code, output = self.run_main("--base", "main")
        self.assertEqual(code, 0, output)
        git("mv", "old2.png", "new2.png")
        Path("new2.png").write_bytes(big + b"2" * 50_000)
        commit_all("rename and edit")
        code, output = self.run_main("--base", "main")
        self.assertEqual(code, 1)
        self.assertIn("::error file=new2.png::", output)

    def test_head_argument_checks_another_ref(self):
        Path("huge.png").write_bytes(image_bytes() + b"\0" * (MODULE.ERROR_BYTES + 1))
        commit_all("add huge")
        git("checkout", "-q", "main")
        code, _ = self.run_main("--base", "main", "--head", "pr")
        self.assertEqual(code, 1)

    def test_base_from_environment(self):
        Path("small.png").write_bytes(image_bytes())
        commit_all("add small")
        with mock.patch.dict(os.environ, {"IMAGE_CHECK_BASE": "main"}):
            code, _ = self.run_main()
        self.assertEqual(code, 0)

    def test_missing_base_is_a_usage_error(self):
        with mock.patch.dict(os.environ):
            os.environ.pop("IMAGE_CHECK_BASE", None)
            with contextlib.redirect_stderr(io.StringIO()):
                self.assertEqual(MODULE.main([]), 2)

    def test_step_summary_is_written(self):
        Path("wide.jpg").write_bytes(image_bytes((2600, 4), "JPEG"))
        commit_all("add wide")
        summary = Path(self.tmp.name, "summary.md")
        with mock.patch.dict(os.environ, {"GITHUB_STEP_SUMMARY": str(summary)}):
            self.run_main("--base", "main")
        self.assertIn("| Warn | `wide.jpg` |", summary.read_text())

    def test_annotation_properties_are_escaped(self):
        Path("a,b: 100%.jpg").write_bytes(image_bytes((2600, 4), "JPEG"))
        commit_all("odd name")
        _, output = self.run_main("--base", "main")
        self.assertIn("::warning file=a%2Cb%3A 100%25.jpg::", output)


if __name__ == "__main__":
    unittest.main()
