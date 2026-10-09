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


class ZoteroBibliographiesTests(unittest.TestCase):
    def test_eu_source_is_unchanged(self):
        self.assertEqual(
            MODULE.ZOTERO_BIBLIOGRAPHIES[0],
            {
                "group_id": "1732893",
                "tag": ">UseGalaxy.eu",
                "destination": Path("content/eu/citations/citations-eu.bib"),
            },
        )

    def test_subsite_sources_write_to_their_citations_directory(self):
        destinations = {str(source["destination"]): source["tag"] for source in MODULE.ZOTERO_BIBLIOGRAPHIES[1:]}

        self.assertEqual(
            destinations,
            {
                "content/belgium/citations/citations-belgium.bib": ">UseGalaxy.be",
                "content/cz/citations/citations-cz.bib": ">MetaCentrum",
                "content/genouest/citations/citations-genouest.bib": ">GenOuest",
                "content/pasteur/citations/citations-pasteur.bib": ">Pasteur",
                "content/us/citations/citations-us.bib": ">UseGalaxy.org",
            },
        )

    def test_zotero_destinations_do_not_overlap_local_bibliographies(self):
        zotero = {source["destination"] for source in MODULE.ZOTERO_BIBLIOGRAPHIES}

        self.assertEqual(len(zotero), len(MODULE.ZOTERO_BIBLIOGRAPHIES))
        self.assertFalse(zotero & set(MODULE.LOCAL_BIBLIOGRAPHIES))


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

    def synced_output(self, errors):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "github_output"
            output.write_text("")
            with (
                mock.patch.object(MODULE, "ZOTERO_BIBLIOGRAPHIES", [{"tag": "a"}, {"tag": "b"}]),
                mock.patch.object(MODULE, "sync_zotero_bibliographies", return_value=(False, errors)),
                mock.patch.object(MODULE, "normalize_local_bibliographies", return_value=False),
                mock.patch.dict("os.environ", {"GITHUB_OUTPUT": str(output)}),
                mock.patch("sys.argv", ["update-eu-citations.py"]),
                self.assertRaises(SystemExit),
            ):
                MODULE.main()
            return output.read_text()

    def test_reports_synced_when_some_sources_succeed(self):
        self.assertEqual(self.synced_output(["b: Failed to fetch b"]), "synced=true\n")

    def test_reports_not_synced_when_every_source_fails(self):
        self.assertEqual(self.synced_output(["a: Failed to fetch a", "b: Failed to fetch b"]), "synced=false\n")

    def test_writes_no_output_outside_github_actions(self):
        with mock.patch.dict("os.environ", clear=True), mock.patch("builtins.open") as opened:
            MODULE.write_github_output("synced", "true")

        opened.assert_not_called()


if __name__ == "__main__":
    unittest.main()
