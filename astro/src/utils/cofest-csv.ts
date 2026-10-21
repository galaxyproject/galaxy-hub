export interface Project {
  project: string;
  description: string;
  lead: string;
  assignees: string[];
}

/**
 * Tokenize CSV text into rows of cells. Handles quoted fields containing
 * commas, escaped quotes (""), and embedded newlines, plus CRLF/CR line
 * endings. Published Google Sheets emit CRLF and will quote any cell that
 * contains a comma or a manual line break, so we can't just split on "\n".
 */
function tokenize(text: string): string[][] {
  const normalized = text.replace(/\r\n?/g, '\n');
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (inQuotes) {
      if (ch === '"') {
        if (normalized[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += ch;
    }
  }

  // Flush a trailing cell/row when the file doesn't end with a newline.
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

/**
 * Parse the CoFest project sheet. Columns are matched by header name
 * (Project, Description, Lead, Assignees) so reordering or inserting columns
 * in the sheet doesn't silently mismap data; falls back to positional order
 * if the expected headers aren't found.
 */
export function parseCsv(text: string): Project[] {
  const rows = tokenize(text);
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const colOr = (name: string, fallback: number) => {
    const i = header.indexOf(name);
    return i === -1 ? fallback : i;
  };
  const idx = {
    project: colOr('project', 0),
    description: colOr('description', 1),
    lead: colOr('lead', 2),
    assignees: colOr('assignees', 3),
  };

  const at = (cols: string[], i: number) => (cols[i] ?? '').trim();

  return rows
    .slice(1)
    .map((cols) => ({
      project: at(cols, idx.project),
      description: at(cols, idx.description),
      lead: at(cols, idx.lead),
      assignees: at(cols, idx.assignees)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }))
    .filter((p) => p.project);
}
