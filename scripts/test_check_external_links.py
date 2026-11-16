import importlib.util
import tempfile
import unittest
import urllib.error
from pathlib import Path

SCRIPT_PATH = Path(__file__).with_name("check_external_links.py")
SPEC = importlib.util.spec_from_file_location("check_external_links", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)


class FakeResponse:
    def __init__(self, code: int, url: str):
        self._code = code
        self._url = url

    def getcode(self) -> int:
        return self._code

    def geturl(self) -> str:
        return self._url


def http_error(code: int) -> urllib.error.HTTPError:
    return urllib.error.HTTPError("http://x", code, "err", {}, None)


def opener_from(plan):
    """Build an opener returning/raising per (method -> result) plan."""

    def opener(url, method):
        outcome = plan[method]
        if isinstance(outcome, Exception):
            raise outcome
        return outcome

    return opener


class ClassifyTests(unittest.TestCase):
    def test_head_404_falls_through_to_get(self):
        """toolshed.g2.bx.psu.edu answers HEAD with 404 but GET with 200."""
        opener = opener_from({"HEAD": http_error(404), "GET": FakeResponse(200, "http://x")})
        self.assertEqual(MODULE.classify("http://x", opener)[0], "OK")

    def test_dead_only_when_get_also_fails(self):
        opener = opener_from({"HEAD": http_error(404), "GET": http_error(404)})
        self.assertEqual(MODULE.classify("http://x", opener)[0], "DEAD")

    def test_gone_is_dead(self):
        opener = opener_from({"HEAD": http_error(410), "GET": http_error(410)})
        self.assertEqual(MODULE.classify("http://x", opener)[0], "DEAD")

    def test_forbidden_is_blocked_not_dead(self):
        opener = opener_from({"HEAD": http_error(403), "GET": http_error(403)})
        self.assertEqual(MODULE.classify("http://x", opener)[0], "BLOCKED")

    def test_server_error(self):
        opener = opener_from({"HEAD": http_error(503), "GET": http_error(503)})
        self.assertEqual(MODULE.classify("http://x", opener)[0], "SERVERERR")

    def test_redirect_to_signin_is_login(self):
        opener = opener_from(
            {"HEAD": FakeResponse(200, "https://accounts.google.com/ServiceLogin?x=1")}
        )
        self.assertEqual(MODULE.classify("http://x", opener)[0], "LOGIN")

    def test_network_failure_is_unreachable_after_get(self):
        opener = opener_from({"HEAD": OSError("dns"), "GET": OSError("dns")})
        state, detail = MODULE.classify("http://x", opener)
        self.assertEqual(state, "UNREACHABLE")
        self.assertEqual(detail, "OSError")

    def test_head_network_failure_still_tries_get(self):
        opener = opener_from({"HEAD": OSError("dns"), "GET": FakeResponse(200, "http://x")})
        self.assertEqual(MODULE.classify("http://x", opener)[0], "OK")


class CollectUrlsTests(unittest.TestCase):
    def test_collects_maps_and_cleans(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "a.md").write_text(
                "See https://example-real.org/page. and <https://example-real.org/page>\n"
                "Skip https://example.com/ignored\n",
                encoding="utf-8",
            )
            (root / "b.yml").write_text("url: https://other.org/x\n", encoding="utf-8")
            (root / "c.txt").write_text("https://not-scanned.org/\n", encoding="utf-8")
            urls = MODULE.collect_urls(str(root))

        self.assertIn("https://example-real.org/page", urls)        # trailing "." stripped
        self.assertIn("https://other.org/x", urls)
        self.assertNotIn("https://example.com/ignored", urls)       # skipped host
        self.assertNotIn("https://not-scanned.org/", urls)          # .txt not scanned
        self.assertEqual(
            {Path(p).name for p in urls["https://example-real.org/page"]}, {"a.md"}
        )

    def test_skips_image_and_asset_directories(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "images").mkdir()
            (root / "images" / "x.md").write_text("https://skipme.org/\n", encoding="utf-8")
            self.assertEqual(MODULE.collect_urls(str(root)), {})


if __name__ == "__main__":
    unittest.main()
