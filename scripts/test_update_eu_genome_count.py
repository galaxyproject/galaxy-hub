import importlib.util
import tempfile
import unittest
from contextlib import redirect_stderr, redirect_stdout
from io import StringIO
from pathlib import Path

SCRIPT_PATH = Path(__file__).with_name("update-eu-genome-count.py")
SPEC = importlib.util.spec_from_file_location("update_eu_genome_count", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)


class UpdateGenomeCountTests(unittest.TestCase):
    def write_page(self, content: str) -> Path:
        temporary_directory = tempfile.TemporaryDirectory()
        self.addCleanup(temporary_directory.cleanup)
        path = Path(temporary_directory.name) / "index.md"
        path.write_text(content, encoding="utf-8")
        return path

    def test_updates_the_marked_count_and_preserves_other_content(self):
        path = self.write_page(
            "Before {/* GENOME_COUNT */}23{/* /GENOME_COUNT */} after 99.\n"
        )

        with redirect_stdout(StringIO()):
            changed = MODULE.update_file(str(path), 42, check_only=False)

        self.assertTrue(changed)
        self.assertEqual(
            path.read_text(encoding="utf-8"),
            "Before {/* GENOME_COUNT */}42{/* /GENOME_COUNT */} after 99.\n",
        )

    def test_check_mode_reports_a_change_without_writing(self):
        original = "Count: {/* GENOME_COUNT */}23{/* /GENOME_COUNT */}\n"
        path = self.write_page(original)

        with redirect_stdout(StringIO()):
            changed = MODULE.update_file(str(path), 24, check_only=True)

        self.assertTrue(changed)
        self.assertEqual(path.read_text(encoding="utf-8"), original)

    def test_returns_false_when_the_count_is_current(self):
        original = "Count: {/* GENOME_COUNT */}23{/* /GENOME_COUNT */}\n"
        path = self.write_page(original)

        with redirect_stdout(StringIO()):
            changed = MODULE.update_file(str(path), 23, check_only=False)

        self.assertFalse(changed)
        self.assertEqual(path.read_text(encoding="utf-8"), original)

    def test_exits_when_the_marker_is_missing(self):
        path = self.write_page("Count: 23\n")

        with redirect_stderr(StringIO()), self.assertRaisesRegex(SystemExit, "2"):
            MODULE.update_file(str(path), 24, check_only=False)

    def test_exits_when_multiple_markers_are_present(self):
        original = (
            "{/* GENOME_COUNT */}23{/* /GENOME_COUNT */}\n"
            "{/* GENOME_COUNT */}24{/* /GENOME_COUNT */}\n"
        )
        path = self.write_page(original)

        with redirect_stderr(StringIO()), self.assertRaisesRegex(SystemExit, "2"):
            MODULE.update_file(str(path), 25, check_only=False)

        self.assertEqual(path.read_text(encoding="utf-8"), original)


if __name__ == "__main__":
    with redirect_stdout(StringIO()):
        unittest.main()
