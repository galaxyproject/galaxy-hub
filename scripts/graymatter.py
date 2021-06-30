#!/usr/bin/env python3
import argparse
import pathlib
import sys
import yaml


def parse(lines, parse_yaml=True):
  content_lines = []
  yaml_lines = []
  state = None
  for line_raw in lines:
    line = line_raw.rstrip('\r\n')
    # Update the state for this line.
    if state is None:
      if line == '---':
        state = 'graymatter'
        continue
      elif line.strip():
        state = 'content'
      else:
        continue
    elif state == 'graymatter':
      if line == '---':
        state = 'content'
        continue 
    # Process the line according to the state.
    if state == 'graymatter':
      yaml_lines.append(line_raw)
    elif state == 'content':
      content_lines.append(line_raw)
  # Parse the yaml
  yaml_str = ''.join(yaml_lines)
  if parse_yaml:
    try:
      metadata = yaml.safe_load(yaml_str)
    except yaml.YAMLError as error:
      raise ValueError(f'Invalid YAML in gray-matter: {error}')
  else:
    metadata = yaml_str
  return metadata, ''.join(content_lines)


def make_argparser():
  parser = argparse.ArgumentParser(add_help=False)
  options = parser.add_argument_group('Options')
  options.add_argument('input', metavar='input.md', type=pathlib.Path,
    help='Input markdown file. WARNING: Will be overwritten if no output path is given.')
  options.add_argument('-m', '--meta', action='store_true',
    help='Just print the graymatter YAML.')
  options.add_argument('-c', '--content', action='store_true',
    help='Omit the graymatter and just print the content.')
  options.add_argument('-k', '--key',
    help='Just print the value of this key from the metadata.')
  options.add_argument('-t', '--trim', action='store_true',
    help='Trim whitespace one either side of the output.')
  options.add_argument('-e', '--exe', type=pathlib.Path)
  options.add_argument('-h', '--help', action='help',
    help='Print this argument help text and exit.')
  return parser


def main(argv):
  parser = make_argparser()
  args = parser.parse_args(argv[1:])

  with args.input.open() as infile:
    if args.key:
      metadata, content = parse(infile, parse_yaml=True)
    else:
      metadata, content = parse(infile, parse_yaml=False)

  if args.key:
    if metadata is None:
      fail('No metadata found.')
    try:
      output = metadata[args.key]
    except KeyError:
      fail(f'No key {args.key!r} found in the metadata.')
    if output is None:
      output = ''
    else:
      output = str(output).rstrip()+'\n'
  elif args.meta:
    output = metadata
  elif args.content:
    output = content
  else:
    fail('Must choose either --meta, --content, or --key.')

  if args.trim:
    output = output.strip()
    if output:
      output += '\n'

  print(output, end='')


def fail(message):
  print(f'Error: {message}', file=sys.stderr)
  if __name__ == '__main__':
    sys.exit(1)
  else:
    raise Exception(message)


if __name__ == '__main__':
  try:
    sys.exit(main(sys.argv))
  except BrokenPipeError:
    pass
