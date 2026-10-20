import importlib.util
import unittest
from pathlib import Path

SCRIPT_PATH = Path(__file__).with_name("update-tools.py")
SPEC = importlib.util.spec_from_file_location("update_tools", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)

SERVER = "https://galaxy.example"


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
