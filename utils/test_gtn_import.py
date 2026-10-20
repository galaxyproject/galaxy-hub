import os
import runpy
import sys
import tempfile
import types
import unittest
from pathlib import Path
from unittest import mock

import yaml
from markdown_it import MarkdownIt

SCRIPT_PATH = Path(__file__).with_name("gtn-import.py")

FEED = """<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>GTN</title>
  <id>urn:gtn</id>
  <updated>2026-10-02T00:00:00Z</updated>
  <entry>
    <title>Unsafe &amp;lt;b&amp;gt; post</title>
    <id>https://gtn.example/news/2026/10/01/unsafe.html</id>
    <link href="javascript:alert(1)"/>
    <published>2026-10-01T00:00:00Z</published>
    <summary type="html">Text &amp;lt;script&amp;gt;alert(1)&amp;lt;/script&amp;gt; and [x](javascript:alert(2)). Second.</summary>
  </entry>
  <entry>
    <title>Markup post</title>
    <id>https://gtn.example/news/2026/10/02/markup.html</id>
    <link href="https://gtn.example/news/2026/10/02/markup.html"/>
    <published>2026-10-02T00:00:00Z</published>
    <summary type="html">&lt;p&gt;Para &lt;img src="x"&gt; one. Rest&lt;/p&gt;&lt;p&gt;Two &amp;amp; more&lt;/p&gt;</summary>
  </entry>
</feed>
"""


class FakeRepo:
    full_name = "owner/repo"
    default_branch = "main"

    def __init__(self):
        self.files = {}

    def get_branch(self, name):
        return types.SimpleNamespace(commit=types.SimpleNamespace(sha="0" * 40))

    def create_git_ref(self, ref, sha):
        pass

    def create_file(self, path, message, content, branch):
        self.files[path] = content

    def create_pull(self, **kwargs):
        return types.SimpleNamespace(html_url="https://github.example/pull/1")


def stub_modules(repo):
    github = types.ModuleType("github")
    github.Github = lambda token: types.SimpleNamespace(get_repo=lambda name: repo, search_issues=lambda query: [])
    github.GithubException = type("GithubException", (Exception,), {})
    geopy = types.ModuleType("geopy")
    geocoders = types.ModuleType("geopy.geocoders")
    geocoders.Nominatim = None
    converter = types.ModuleType("country_converter")
    converter.CountryConverter = None
    return {"github": github, "geopy": geopy, "geopy.geocoders": geocoders, "country_converter": converter}


def run_import(import_type):
    repo = FakeRepo()
    with tempfile.TemporaryDirectory() as tmp:
        feed_path = Path(tmp, "feed.xml")
        feed_path.write_text(FEED)
        env = {
            "FEED_URL": str(feed_path),
            "IMPORT_TYPE": import_type,
            "GITHUB_TOKEN": "x",
            "REPO_NAME": repo.full_name,
        }
        cwd = os.getcwd()
        os.chdir(tmp)
        try:
            with mock.patch.dict(os.environ, env), mock.patch.dict(sys.modules, stub_modules(repo)):
                runpy.run_path(str(SCRIPT_PATH), run_name="__main__")
        finally:
            os.chdir(cwd)
    posts = {}
    for path, content in repo.files.items():
        _, front, body = content.split("---\n", 2)
        posts[Path(path).parent.name] = (yaml.safe_load(front), body)
    return posts


def render_markdown(text):
    """CommonMark with raw HTML, keeping every link scheme as the site's remark pipeline does."""
    md = MarkdownIt("commonmark")
    md.validateLink = lambda url: True
    return md.render(text)


class GtnImportTests(unittest.TestCase):
    def test_news_drops_unsafe_link_and_keeps_summary_as_text(self):
        posts = run_import("news")

        meta, body = posts["2026-10-01-unsafe"]
        self.assertEqual(meta["external_url"], "")
        self.assertEqual(meta["title"], "Unsafe <b> post")
        self.assertEqual(meta["tease"], "Text <script>alert(1)</script> and [x](javascript:alert(2))")
        rendered = render_markdown(body)
        self.assertNotIn("<script", rendered)
        self.assertNotIn("<a ", rendered)
        self.assertEqual(
            rendered,
            "<p>Text &lt;script&gt;alert(1)&lt;/script&gt; and [x](javascript:alert(2)). Second.</p>\n",
        )

    def test_news_reduces_summary_markup_to_text(self):
        posts = run_import("news")

        meta, body = posts["2026-10-02-markup"]
        self.assertEqual(meta["external_url"], "https://gtn.example/news/2026/10/02/markup.html")
        self.assertEqual(meta["tease"], "Para one")
        self.assertEqual(render_markdown(body), "<p>Para one. Rest</p>\n<p>Two &amp; more</p>\n")

    def test_events_drop_unsafe_link(self):
        posts = run_import("events")

        meta, body = posts["unsafe"]
        self.assertEqual(meta["external_url"], "")
        self.assertNotIn("<script", render_markdown(body))


if __name__ == "__main__":
    unittest.main()
