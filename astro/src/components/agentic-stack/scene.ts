/**
 * Screenplay for the run window on /tools/agentic-stack/ ("The Galaxy
 * agentic stack"): an agent that finds no installed tool for a step, writes a
 * user-defined tool, and runs it on Galaxy next to an installed tool.
 *
 * The MCP tool names are the galaxy-mcp surface (get_history_contents,
 * search_tools_by_keywords, create_user_tool, run_user_tool, get_job_details,
 * search_tools_by_name, run_tool) and TOOL_YAML is a complete, validated
 * GalaxyUserTool. Dataset names, sizes, job ids and timings are illustrative.
 */
import type { Scene } from './types';

/**
 * The complete tool the agent writes: the single source of truth for the
 * disclosure under the window (content/tools/agentic-stack/index.md carries
 * the same text) and for the abbreviated card in the transcript. String.raw
 * keeps the script's '\n' and '\t' literal.
 */
export const TOOL_YAML = String.raw`class: GalaxyUserTool
id: gff-seqname-map
version: "0.1.0"
name: Rename GFF sequence names
description: Rewrite column 1 of a GFF3 file from a two-column mapping; fail on unknown names
container: python:3.11-slim
shell_command: |
  python - '$(inputs.gff.path)' '$(inputs.mapping.path)' renamed.gff3 <<'PY'
  import sys
  gff, mapfile, out = sys.argv[1:4]
  names = {}
  with open(mapfile) as fh:
      for line in fh:
          if line.startswith('#') or not line.strip():
              continue
          old, new = line.rstrip('\n').split('\t')[:2]
          names[old] = new
  renamed = unknown = 0
  missing = set()
  with open(gff) as fin, open(out, 'w') as fout:
      for line in fin:
          if line.startswith('#') or not line.strip():
              fout.write(line)
              continue
          cols = line.split('\t')
          if cols[0] in names:
              cols[0] = names[cols[0]]
              renamed += 1
          else:
              unknown += 1
              missing.add(cols[0])
          fout.write('\t'.join(cols))
  print(f'renamed {renamed} feature lines; {len(names)} names mapped; {unknown} unknown')
  if unknown:
      print('unknown sequence names: ' + ', '.join(sorted(missing)), file=sys.stderr)
      sys.exit(2)
  PY
inputs:
  - name: gff
    type: data
    format: gff3
    label: GFF3 annotation
  - name: mapping
    type: data
    format: tabular
    label: Two-column mapping (old name, new name)
outputs:
  - name: renamed
    type: data
    format: gff3
    from_work_dir: renamed.gff3
help:
  format: markdown
  content: |
    Rewrites the sequence name (column 1) of every feature line in a GFF3 file
    using a two-column tab-separated mapping of old name to new name. Comment
    and blank lines pass through unchanged. The job fails if a sequence name is
    missing from the mapping; stdout reports how many lines changed.
`;

const ASK =
  'reads.bam uses chrM and chr1-style names; genes.gff3 uses MT and 1. Rename the GFF sequence names with the mapping in chrom_map.tsv, then count reads per gene.';

const UDT_JOB = '8c1d2e7a4b9f0356';
const FC_JOB = '5d0f9a2c71be4e08';
const UDT_NAME = 'Rename GFF sequence names';
const UDT_CONTAINER = 'python:3.11-slim';
const FC_CONTAINER = 'quay.io/biocontainers/subread';

export const scene: Scene = {
  title: 'agent · usegalaxy.org',
  server: 'usegalaxy.org',
  history: 'ATAC run 3',
  seed: [
    { hid: 3, name: 'chrom_map.tsv', format: 'tabular', state: 'ok' },
    { hid: 2, name: 'genes.gff3', format: 'gff3', state: 'ok' },
    { hid: 1, name: 'reads.bam', format: 'bam', state: 'ok' },
  ],
  summary:
    "Replay of an agent run on Galaxy. Asked to rename the sequence names in a GFF3 file from a mapping and count reads per gene, the agent finds no installed tool for the rename, writes a user-defined tool, Galaxy runs it in a container, then runs featureCounts, and both jobs, their outputs and their provenance appear in the history 'ATAC run 3'.",
  lines: [
    // 1 Ask
    { kind: 'user', text: ASK },

    // 2 Look
    {
      kind: 'tool',
      name: 'get_history_contents',
      args: 'ATAC run 3',
      result: '1: reads.bam · 2: genes.gff3 · 3: chrom_map.tsv',
      delay: 900,
    },
    {
      kind: 'tool',
      name: 'search_tools_by_keywords',
      args: 'rename sequence names gff mapping',
      result: 'no match · text replace tools only',
      delay: 900,
    },

    // 3 Decide
    {
      kind: 'assistant',
      text: 'No installed tool applies a name mapping to a GFF3 file and checks for unknown names. I will write a user-defined tool for that step and use featureCounts for the counting.',
    },

    // 4 Write — abbreviated by hand from TOOL_YAML above; keep the two in step.
    {
      kind: 'yaml',
      file: 'gff-seqname-map.yml',
      lines: [
        'class: GalaxyUserTool',
        'id: gff-seqname-map',
        'version: "0.1.0"',
        `name: ${UDT_NAME}`,
        'description: Rewrite column 1 of a GFF3 file from a mapping',
        `container: ${UDT_CONTAINER}`,
        "shell_command: python - '$(inputs.gff.path)' '$(inputs.mapping.path)' renamed.gff3 <<'PY' …",
        'inputs: gff (data, gff3) · mapping (data, tabular)',
        'outputs: renamed ← renamed.gff3',
        'help: markdown …',
      ],
    },

    // 5 Create — the "tool" of tool / job / dataset.
    {
      kind: 'tool',
      name: 'create_user_tool',
      args: 'gff-seqname-map 0.1.0',
      result: 'created · private to your account',
      delay: 1000,
    },
    { kind: 'hist', op: 'tool', name: UDT_NAME, version: '0.1.0' },

    // 6 Run — the "job".
    {
      kind: 'tool',
      name: 'run_user_tool',
      args: 'gff = data 2 · mapping = data 3',
      result: `job ${UDT_JOB} queued`,
      delay: 900,
    },
    { kind: 'hist', op: 'add', hid: 4, name: `${UDT_NAME} on data 2 and data 3`, state: 'queued' },
    { kind: 'pause', ms: 900 },
    { kind: 'hist', op: 'state', hid: 4, state: 'running', note: UDT_CONTAINER, hold: 3000 },
    { kind: 'hist', op: 'state', hid: 4, state: 'ok' },

    // 7 Poll — the "dataset".
    { kind: 'tool', name: 'get_job_details', args: `${UDT_JOB.slice(0, 8)}…`, result: 'ok · exit 0 · 3 s', delay: 900 },
    { kind: 'hist', op: 'expand', hid: 4, meta: 'gff3 · 41,983 lines' },

    // 8 Count — an installed tool where one exists.
    {
      kind: 'tool',
      name: 'search_tools_by_name',
      args: 'featureCounts',
      result: 'featureCounts 2.0.3+galaxy2',
      delay: 800,
    },
    {
      kind: 'tool',
      name: 'run_tool',
      args: 'featureCounts · data 1 + data 4',
      result: `job ${FC_JOB} queued`,
      delay: 900,
    },
    { kind: 'hist', op: 'add', hid: 5, name: 'featureCounts on data 1 and data 4: Counts', state: 'queued' },
    { kind: 'hist', op: 'add', hid: 6, name: 'featureCounts on data 1 and data 4: Summary', state: 'queued' },
    { kind: 'pause', ms: 800 },
    { kind: 'hist', op: 'state', hid: 5, state: 'running', note: FC_CONTAINER },
    { kind: 'hist', op: 'state', hid: 6, state: 'running', note: FC_CONTAINER, hold: 3000 },
    { kind: 'hist', op: 'state', hid: 5, state: 'ok' },
    { kind: 'hist', op: 'state', hid: 6, state: 'ok' },
    { kind: 'tool', name: 'get_job_details', args: `${FC_JOB.slice(0, 8)}…`, result: 'ok · exit 0 · 41 s', delay: 900 },

    // 9 Record — what Galaxy kept.
    {
      kind: 'hist',
      op: 'info',
      hid: 4,
      fields: [
        ['Tool', `${UDT_NAME} · 0.1.0 · user-defined`],
        ['Container', UDT_CONTAINER],
        ['Command', "python - '…/dataset_2.dat' '…/dataset_3.dat' renamed.gff3 <<'PY' …"],
        ['Inputs', '2: genes.gff3 · 3: chrom_map.tsv'],
        ['Parameters', 'gff = data 2 · mapping = data 3'],
        ['stdout', 'renamed 41983 feature lines; 25 names mapped; 0 unknown'],
        ['stderr', '(empty)'],
        ['Exit code', '0 · 3 s'],
      ],
    },
    {
      kind: 'assistant',
      text: `Done. Job 1 ran ${UDT_NAME} 0.1.0 in ${UDT_CONTAINER}; job 2 ran featureCounts 2.0.3. Counts are dataset 5. Both jobs are in 'ATAC run 3' with their commands, containers and logs.`,
    },

    // 10 After
    { kind: 'hist', op: 'actions' },
  ],
};
