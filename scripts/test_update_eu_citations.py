import importlib.util
import tempfile
import unittest
from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
from unittest import mock

SCRIPT_PATH = Path(__file__).with_name("update-eu-citations.py")
SPEC = importlib.util.spec_from_file_location("update_eu_citations", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)

ENTRY = b"@article{key_1,\n  title = {A paper},\n  year = {2024}\n}\n"


class SyncZoteroBibliographiesTests(unittest.TestCase):
    def setUp(self):
        temporary_directory = tempfile.TemporaryDirectory()
        self.addCleanup(temporary_directory.cleanup)
        self.root = Path(temporary_directory.name)
        self.sources = [
            {"group_id": "1", "tag": tag, "destination": self.root / f"{tag}.bib"} for tag in ("a", "b", "c")
        ]

    def sync(self, fetch, check=False):
        with (
            mock.patch.object(MODULE, "ZOTERO_BIBLIOGRAPHIES", self.sources),
            mock.patch.object(MODULE, "fetch_zotero_bibliography", side_effect=fetch),
            redirect_stdout(StringIO()),
        ):
            return MODULE.sync_zotero_bibliographies(check)

    def test_a_failing_source_does_not_stop_the_others(self):
        def fetch(group_id, tag):
            if tag == "b":
                raise OSError("Failed to fetch b")
            return ENTRY

        changed, errors = self.sync(fetch)

        self.assertTrue(changed)
        self.assertEqual(errors, ["b: Failed to fetch b"])
        self.assertTrue((self.root / "a.bib").exists())
        self.assertFalse((self.root / "b.bib").exists())
        self.assertTrue((self.root / "c.bib").exists())

    def test_a_source_without_entries_is_reported_and_not_written(self):
        existing = self.root / "b.bib"
        existing.write_bytes(ENTRY)

        changed, errors = self.sync(lambda group_id, tag: b"\n" if tag == "b" else ENTRY)

        self.assertTrue(changed)
        self.assertEqual(errors, [f"b: Zotero returned no BibTeX entries for {existing}"])
        self.assertEqual(existing.read_bytes(), ENTRY)

    def test_check_mode_reports_without_writing(self):
        changed, errors = self.sync(lambda group_id, tag: ENTRY, check=True)

        self.assertTrue(changed)
        self.assertEqual(errors, [])
        self.assertEqual(list(self.root.iterdir()), [])


class MainTests(unittest.TestCase):
    def test_exits_with_the_errors_after_normalizing_local_files(self):
        with (
            mock.patch.object(MODULE, "sync_zotero_bibliographies", return_value=(True, ["Failed to fetch b"])),
            mock.patch.object(MODULE, "normalize_local_bibliographies", return_value=False) as normalize,
            mock.patch("sys.argv", ["update-eu-citations.py"]),
            self.assertRaisesRegex(SystemExit, "Failed to fetch b"),
        ):
            MODULE.main()

        normalize.assert_called_once_with(False)


if __name__ == "__main__":
    unittest.main()
