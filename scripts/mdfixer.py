#!/usr/bin/env python3
"""Small Python hook for mdfixer.mjs."""
import argparse
import logging
import pathlib
import subprocess
import sys
# Local modules
import vbuild

SCRIPT_DIR = pathlib.Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent


def prepare_command(exe=None, verbose=False):
  if exe is None:
    exe = SCRIPT_DIR/'mdfixer.mjs'
  command = [exe]
  if not verbose:
    command.append('-q')
  return command


# Compatible with "placer" interface of `partition_content.EventHandler`.
def fix_file(old_path, new_path=None, simulate=True, exe=None, verbose=False):
  if new_path is None:
    new_path = old_path
  command = prepare_command(exe=exe, verbose=verbose)
  command += [old_path, '-o', new_path]
  logging.info(f'Fixing markdown of {old_path}, writing to {new_path}')
  if not simulate:
    subprocess.run(command)


def fix_dir(dir_path, simulate=True, exe=None, verbose=False):
  command = prepare_command(exe=exe, verbose=verbose)
  command += [dir_path, '-o']
  logging.info(f'Fixing markdown of all files in {dir_path}')
  if not simulate:
    subprocess.run(command)


def preprocess(config_path, project_root=PROJECT_ROOT, simulate=True):
  config = vbuild.read_config(config_path)
  for build_dir in config['build']['dirs'].values():
    fix_dir(build_dir, simulate=simulate)


def make_argparser():
  parser = argparse.ArgumentParser(add_help=False)
  options = parser.add_argument_group('Options')
  options.add_argument('input', metavar='input.md', type=pathlib.Path,
    help='Input markdown file. WARNING: Will be overwritten if no output path is given.')
  options.add_argument('output', metavar='output.md', type=pathlib.Path, nargs='?',
    help='Output markdown file. Defaults to the input file.')
  options.add_argument('-e', '--exe', type=pathlib.Path)
  options.add_argument('-h', '--help', action='help',
    help='Print this argument help text and exit.')
  return parser


def main(argv):
  parser = make_argparser()
  args = parser.parse_args(argv[1:])
  fix_file(args.input, new_path=args.output, exe=args.exe)


if __name__ == '__main__':
  try:
    sys.exit(main(sys.argv))
  except BrokenPipeError:
    pass
