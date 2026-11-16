import importlib.util
import unittest
from pathlib import Path

from markdown_it import MarkdownIt

SCRIPT_PATH = Path(__file__).with_name("update-tools.py")
SPEC = importlib.util.spec_from_file_location("update_tools", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)

SERVER = "https://galaxy.example"


def render_markdown(text: str) -> str:
    """CommonMark with raw HTML, keeping every link scheme as the site's remark pipeline does."""
    md = MarkdownIt("commonmark")
    md.validateLink = lambda url: True
    return md.render(text)


class RenderSectionsTests(unittest.TestCase):
    def test_escapes_section_and_label_names(self):
        sections = [
            {"model_class": "ToolSectionLabel", "text": "Label <img src=x> & more"},
            {
                "model_class": "ToolSection",
                "name": "Get Data <script>x</script> & Send",
                "elems": [],
            },
        ]

        out, count = MODULE.render_sections(sections, SERVER)

        self.assertEqual(count, 0)
        self.assertIn("## Label &lt;img src=x&gt; &amp; more\n", out)
        self.assertIn("### Get Data &lt;script&gt;x&lt;/script&gt; &amp; Send\n", out)
        self.assertNotIn("<img", out)
        self.assertNotIn("<script", out)

    def test_link_syntax_in_names_renders_as_text(self):
        link = "[x](javascript:alert(1))"
        sections = [
            {"model_class": "ToolSectionLabel", "text": f"Label {link}"},
            {
                "model_class": "ToolSection",
                "name": f"Section {link}",
                "elems": [
                    {"model_class": "Tool", "id": "t", "name": f"Tool {link}", "description": link},
                ],
            },
            {"model_class": "ToolSection", "name": "Ref [x]\\", "elems": []},
        ]

        out, _ = MODULE.render_sections(sections, SERVER)
        rendered = render_markdown(out)

        self.assertNotIn("href=\"javascript", rendered)
        self.assertEqual(rendered.count("<a "), 1)
        self.assertIn(f"<h2>Label {link}</h2>", rendered)
        self.assertIn(f"<h3>Section {link}</h3>", rendered)
        self.assertIn(f">Tool {link}</a>", rendered)
        self.assertIn("<h3>Ref [x]\\</h3>", rendered)

    def test_keeps_plain_names_and_quotes_unchanged(self):
        sections = [
            {"model_class": "ToolSection", "name": "Text Manipulation 'basic'", "elems": []},
        ]

        out, _ = MODULE.render_sections(sections, SERVER)

        self.assertIn("### Text Manipulation 'basic'\n", out)

    def test_renders_and_counts_tools(self):
        sections = [
            {
                "model_class": "ToolSection",
                "name": "Filter",
                "elems": [
                    {"model_class": "Tool", "id": "b_tool", "name": "B <tool>", "description": "d"},
                    {"model_class": "ToolSectionLabel", "text": "skipped"},
                    {"model_class": "Tool", "id": "a_tool", "name": "A", "description": ""},
                ],
            },
            {"model_class": "Tool", "id": "top", "name": "Top", "description": ""},
        ]

        out, count = MODULE.render_sections(sections, SERVER)

        self.assertEqual(count, 3)
        self.assertLess(out.index(">A</a>"), out.index(">B &lt;tool&gt;</a>"))
        self.assertIn(f'<a href="{SERVER}/root?tool_id=top" target="_top" title="">Top</a>', out)


if __name__ == "__main__":
    unittest.main()
