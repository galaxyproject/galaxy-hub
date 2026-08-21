---
title: User-Defined Tools
tease: "Write and run your own simple tools from the Galaxy interface — no server access, no admin installation, no Tool Shed."
---

*Beta feature available on UseGalaxy.org only*

User-Defined Tools (UDTs) let regular Galaxy users write and run their own simple tools directly from the Galaxy interface — no server access, no admin installation, and no waiting for a tool to be added to a Tool Shed. If you've ever needed a quick one-off script, a table-reformatting step, or wanted to glue together a couple of shell commands in a workflow, and didn't want to file a request with your Galaxy admin, UDTs are for you.

UDTs are meant to fill that gap, not to replace published tools. Galaxy's goals of reproducibility and collaboration still matter — whenever a "real" Tool Shed tool already does what you need, prefer it, since workflows and analyses built on published tools are easier for others to share, rerun, and publish. Reach for a UDT when no existing tool fits and the job is too small to justify a full tool submission.

## What is a User-Defined Tool?

A UDT is a small tool definition, written in YAML, that you create and save from within Galaxy itself. It behaves like any other tool on the Tools panel — it has inputs, produces output datasets, and can be added to workflows — but it is created, owned, and (by default) only visible to you.

Here's a complete example: a tool that concatenates a set of input datasets.

```yaml
class: GalaxyUserTool
id: cat_user_defined
version: "0.1"
name: Concatenate Files
description: tail-to-head
container: busybox
shell_command: |
  cat $(inputs.datasets.map((input) => input.path).join(' ')) > output.txt
inputs:
  - name: datasets
    multiple: true
    type: data
outputs:
  - name: output1
    type: data
    format_source: datasets
    from_work_dir: output.txt
```

If you've written a standard Galaxy tool in XML before, this will look familiar — it's the same basic shape (a name, a description, inputs, outputs, and a command to run) with a few important differences described below.

## How is this different from a regular Galaxy tool?

Regular Galaxy tools are written in XML and use the Cheetah templating language to build the command that gets executed. Cheetah has broad access to the Galaxy database and the server's filesystem — which is fine when an administrator is the one writing and reviewing the tool, but is not something Galaxy can safely hand to every user.

To make it safe for any user to author and run their own tools, UDTs use a deliberately restricted format:

- Tools must declare `class: GalaxyUserTool` and are written in YAML rather than XML.
- Every UDT must run inside a **container**, specified with the `container` key. There is no "run directly on the host" option.
- Instead of Cheetah, the command (`shell_command`) is built using **sandboxed JavaScript expressions** inside `$( ... )`. These expressions can only see the tool's declared inputs — they have no access to the Galaxy database, the filesystem outside the job's working directory, reference data, or dataset metadata files (such as BAM indexes).
- The set of supported input types is intentionally smaller than the full XML tool vocabulary: booleans, integers, floats, text, colors, select lists, datasets, and dataset collections, plus the structural building blocks `conditional`, `repeat`, and `section`. Anything outside that set is rejected when the tool is saved.

In short: a UDT can do most of what a simple "chain a couple of command-line tools together" task needs, in exchange for giving up direct system access.

## Creating a tool

Once the feature is enabled on your Galaxy instance (see below), you can create a UDT from the **Tools** panel in the Galaxy interface, which opens an editor where you write the tool definition and save it. Saved tools appear in your own tool list and can be used in histories and workflows just like any other tool.

## The Custom Tools activity

Once User-Defined Tools are enabled for your account, a **Custom Tools** entry (wrench icon) appears in the Activities panel on the left side of the Galaxy interface. This is where you go both to write new UDTs and to find the ones you've already written.

![The Custom Tools panel, opened from the Activities bar, listing a user's saved UDTs with edit and disable actions on each](/tools/user-defined-tools/custom_tools_screenshot.png)

Clicking **Custom Tools** opens a panel listing every UDT you've created, each with its name, version, description, and when it was last edited. From here you can:

- Click the **+** at the top of the panel to open the editor and write a new tool from scratch.
- Click the edit (pencil) icon on any listed tool to open it in the editor and revise its definition.
- Click the disable (circle-slash) icon to disable a tool without deleting it.

## More examples

The concatenation tool above is about as simple as a UDT gets. The two examples below are closer to what a real analysis step looks like — several inputs, several outputs, and a heavier `shell_command`. Click a summary line to expand the full tool definition.

<details>
<summary>Normalize sequence names in a GFF/GTF file, with a report</summary>

This tool rewrites the sequence names (column 1) in a GFF/GTF annotation file using a two-column mapping file, leaves names on an "ignore" list untouched, and fails the job if it encounters a name it doesn't recognize. It also writes a TSV report summarizing what happened to each sequence name. Rather than a one-line command, `shell_command` here is a small embedded Python script — useful once the logic is more than a simple pipe of existing command-line tools.

```yaml
class: GalaxyUserTool
id: gxf-seqname-normalizer
name: gxf-seqname-normalizer
version: 0.1.0
container: python:3.11-slim
shell_command: >-
  python - <<'PY' $(inputs.annotation.path) $(inputs.mapping.path)
  $(inputs.ignore.path) normalized.gxf report.tsv

  import sys

  from collections import Counter

  ann_path, map_path, ign_path, out_path, rep_path = sys.argv[1:6]


  mapping = {}

  map_pairs = 0

  with open(map_path, encoding='utf-8') as fh:
      for line in fh:
          line=line.rstrip('\n')
          if not line or line.startswith('#'):
              continue
          parts=line.split('\t')
          if len(parts) < 2:
              continue
          old,new=parts[0],parts[1]
          mapping[old]=new
          map_pairs += 1

  ignore=set()

  with open(ign_path, encoding='utf-8') as fh:
      for line in fh:
          line=line.strip()
          if not line or line.startswith('#'):
              continue
          ignore.add(line.split('\t')[0])

  seen=Counter(); disposition=Counter(); unknown=[]

  feature_lines=renamed=ignored=passthrough=fasta_lines=comments=0

  in_fasta=False

  with open(ann_path, encoding='utf-8', errors='replace') as inp, open(out_path,
  'w', encoding='utf-8') as out:
      for line in inp:
          if in_fasta:
              fasta_lines += 1
              out.write(line)
              continue
          if line.startswith('##FASTA'):
              comments += 1
              in_fasta=True
              out.write(line)
              continue
          if line.startswith('#') or not line.strip():
              comments += 1 if line.startswith('#') else 0
              out.write(line)
              continue
          parts=line.rstrip('\n').split('\t')
          if len(parts) < 2:
              out.write(line)
              continue
          feature_lines += 1
          seq=parts[0]
          seen[seq] += 1
          if seq in mapping:
              parts[0]=mapping[seq]
              renamed += 1
              disposition[(seq,'mapped',mapping[seq])] += 1
              out.write('\t'.join(parts)+'\n')
          elif seq in ignore:
              ignored += 1
              disposition[(seq,'ignored','')] += 1
              # Preserve ignored records verbatim for auditability; downstream can filter if needed.
              out.write(line)
          else:
              unknown.append(seq)
              disposition[(seq,'unknown','')] += 1

  with open(rep_path, 'w', encoding='utf-8') as rep:
      rep.write('metric\tvalue\n')
      rep.write(f'mapping_pairs\t{map_pairs}\n')
      rep.write(f'ignore_seqnames\t{len(ignore)}\n')
      rep.write(f'feature_lines_in\t{feature_lines}\n')
      rep.write(f'renamed_lines\t{renamed}\n')
      rep.write(f'ignored_lines\t{ignored}\n')
      rep.write(f'comment_or_blank_lines\t{comments}\n')
      rep.write(f'fasta_lines_preserved_after_fasta_pragma\t{fasta_lines}\n')
      rep.write(f'unknown_lines\t{len(unknown)}\n')
      rep.write('\nseqname\tdisposition\ttarget\tcount\n')
      for (seq,disp,target),count in sorted(disposition.items()):
          rep.write(f'{seq}\t{disp}\t{target}\t{count}\n')

  if unknown:
      print('Unknown seqnames: ' + ', '.join(sorted(set(unknown))), file=sys.stderr)
      sys.exit(2)
  PY
inputs:
  - name: annotation
    type: data
  - name: mapping
    type: data
  - name: ignore
    type: data
outputs:
  - name: normalized
    type: data
    format: gff3
    from_work_dir: normalized.gxf
  - name: report
    type: data
    format: tabular
    from_work_dir: report.tsv
```

</details>

<details>
<summary>Run NucleoATAC and expose all of its outputs</summary>

This tool wraps [NucleoATAC](https://github.com/GreenleafLab/NucleoATAC), a real bioinformatics package, running from a Biocontainer image rather than a generic base image. It shows a longer, multi-step `shell_command` (staging inputs, indexing the reference, running the tool, then unpacking each compressed result — or substituting an empty file when NucleoATAC didn't produce one), inputs restricted to specific formats, a dozen labeled outputs, and an optional Markdown `help` block describing the tool for its users.

```yaml
class: GalaxyUserTool
id: nucleoatac-rich-simple
name: NucleoATAC rich outputs simple
version: 0.4.2
description: Run NucleoATAC and expose occupancy, peak, dyad, signal, combined
  map, and NFR outputs.
container: quay.io/biocontainers/nucleoatac:0.3.4--py27hf85d69d_6
shell_command: cp '$(inputs.bam.path)' reads.bam && cp
  '$(inputs.reference.path)' ref.fa && cp '$(inputs.regions.path)' regions.bed
  && python -c "import pysam; pysam.index('reads.bam'); pysam.faidx('ref.fa')"
  && nucleoatac run --bed regions.bed --bam reads.bam --fasta ref.fa --out
  result --cores $GALAXY_SLOTS && if [ -s result.occ.bedgraph.gz ]; then gunzip
  -c result.occ.bedgraph.gz > occ.bedgraph; else touch occ.bedgraph; fi && if [
  -s result.occ.lower_bound.bedgraph.gz ]; then gunzip -c
  result.occ.lower_bound.bedgraph.gz > occ.lower_bound.bedgraph; else touch
  occ.lower_bound.bedgraph; fi && if [ -s result.occ.upper_bound.bedgraph.gz ];
  then gunzip -c result.occ.upper_bound.bedgraph.gz > occ.upper_bound.bedgraph;
  else touch occ.upper_bound.bedgraph; fi && if [ -s result.occpeaks.bed.gz ];
  then gunzip -c result.occpeaks.bed.gz > occpeaks.bed; else touch occpeaks.bed;
  fi && if [ -s result.nucpos.bed.gz ]; then gunzip -c result.nucpos.bed.gz >
  nucpos.bed; else touch nucpos.bed; fi && if [ -s
  result.nucpos.redundant.bed.gz ]; then gunzip -c
  result.nucpos.redundant.bed.gz > nucpos.redundant.bed; else touch
  nucpos.redundant.bed; fi && if [ -s result.nucleoatac_signal.bedgraph.gz ];
  then gunzip -c result.nucleoatac_signal.bedgraph.gz >
  nucleoatac_signal.bedgraph; else touch nucleoatac_signal.bedgraph; fi && if [
  -s result.nucleoatac_signal.smooth.bedgraph.gz ]; then gunzip -c
  result.nucleoatac_signal.smooth.bedgraph.gz >
  nucleoatac_signal.smooth.bedgraph; else touch
  nucleoatac_signal.smooth.bedgraph; fi && if [ -s result.nucmap_combined.bed.gz
  ]; then gunzip -c result.nucmap_combined.bed.gz > nucmap_combined.bed; else
  touch nucmap_combined.bed; fi && if [ -s result.nfrpos.bed.gz ]; then gunzip
  -c result.nfrpos.bed.gz > nfrpos.bed; else touch nfrpos.bed; fi && if [ -s
  result.fragmentsizes.txt ]; then cp result.fragmentsizes.txt
  fragmentsizes.txt; else touch fragmentsizes.txt; fi
inputs:
  - name: bam
    label: Coordinate-sorted ATAC BAM
    type: data
    format:
      - bam
  - name: reference
    label: Reference FASTA with matching chromosome names
    type: data
    format:
      - fasta
  - name: regions
    label: Regions BED
    type: data
    format:
      - bed
outputs:
  - name: occ
    label: NucleoATAC occupancy bedGraph
    type: data
    format: bedgraph
    from_work_dir: occ.bedgraph
  - name: occ_lower
    label: NucleoATAC occupancy lower bound bedGraph
    type: data
    format: bedgraph
    from_work_dir: occ.lower_bound.bedgraph
  - name: occ_upper
    label: NucleoATAC occupancy upper bound bedGraph
    type: data
    format: bedgraph
    from_work_dir: occ.upper_bound.bedgraph
  - name: occpeaks
    label: NucleoATAC occupancy peaks BED
    type: data
    format: bed
    from_work_dir: occpeaks.bed
  - name: nucpos
    label: NucleoATAC high-resolution nucleosome positions BED
    type: data
    format: bed
    from_work_dir: nucpos.bed
  - name: nucpos_redundant
    label: NucleoATAC redundant nucleosome positions BED
    type: data
    format: bed
    from_work_dir: nucpos.redundant.bed
  - name: nucleoatac_signal
    label: NucleoATAC signal bedGraph
    type: data
    format: bedgraph
    from_work_dir: nucleoatac_signal.bedgraph
  - name: nucleoatac_signal_smooth
    label: NucleoATAC smoothed signal bedGraph
    type: data
    format: bedgraph
    from_work_dir: nucleoatac_signal.smooth.bedgraph
  - name: nucmap_combined
    label: NucleoATAC combined nucleosome map BED
    type: data
    format: bed
    from_work_dir: nucmap_combined.bed
  - name: nfrpos
    label: NucleoATAC NFR positions BED
    type: data
    format: bed
    from_work_dir: nfrpos.bed
  - name: fragmentsizes
    label: NucleoATAC fragment-size distribution
    type: data
    format: tabular
    from_work_dir: fragmentsizes.txt
help:
  format: markdown
  content: >-
    Runs NucleoATAC 0.3.4 on a coordinate-sorted ATAC BAM, reference FASTA, and
    regions BED, then exposes the main NucleoATAC intermediate and final
    outputs. Version 0.4.2 uses the fully qualified Quay Biocontainers image to
    avoid Docker Hub library namespace pull failures.


    Inputs must use matching chromosome names across BAM, FASTA, and BED.
    Optional missing output files are represented as empty datasets so no-call
    outputs can be distinguished from failed jobs.
```

</details>

## Enabling User-Defined Tools (for admins)

UDTs are off by default. A Galaxy administrator needs to:

1. Set `enable_beta_tool_formats: true` in the Galaxy configuration.
2. Create a role of type **Custom Tool Execution** (and, if users should also be able to author new tools, **Custom Tool Creation**) in the admin interface.
3. Assign that role to the users or groups who should be allowed to use the feature.

Because this is a beta feature and the security model is still being hardened, we recommend limiting it to trusted users for now.

## Sharing tools

UDTs are private to the user who created them by default. If you embed a UDT in a workflow and share that workflow, anyone who imports the workflow automatically gets a copy of the tool in their own account — they don't need to have created it themselves or have tool-creation permission.

An administrator can also export a UDT to disk and install it like a regular tool, making it available instance-wide.

## Security considerations

UDTs carry similar risks to [Interactive Tools](https://training.galaxyproject.org/training-material/topics/admin/tutorials/interactive-tools/tutorial.html) — both let users run their own code inside containers on your infrastructure. If you're an admin enabling this feature, we strongly recommend reading the [guidance on securing Interactive Tools](https://training.galaxyproject.org/training-material/topics/admin/tutorials/interactive-tools/tutorial.html#securing-interactive-tools) and configuring your job runner to isolate mounts and restrict network access for these jobs, as shown in this [example Pulsar configuration](https://github.com/galaxyproject/galaxy/blob/dev/test/integration/embedded_pulsar_job_conf.yml). For more information on the security concerns and ways to address them, see the [Total Perspective Vantage (TPV) documentation](https://total-perspective-vortex.readthedocs.io/en/latest/topics/advanced_topics.html#auto-injected-tool-type-tags).

## Current limitations

UDTs are a beta feature and still evolving. At the moment:

- There's no access to Galaxy's reference data.
- There's no access to dataset metadata or metadata files (such as BAM indexes).
- There's no access to a tool's `extra_files` directory.
- Test cases aren't supported yet.

## Learn more

For the full technical reference, including the complete list of supported input types and fields, see the [Galaxy administration documentation on User-Defined Tools](https://docs.galaxyproject.org/en/master/admin/user_defined_tools.html).
