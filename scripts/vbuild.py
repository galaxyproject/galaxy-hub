#!/usr/bin/env python3
import argparse
import json
import logging
import os
import pathlib
import shutil
import subprocess
import sys
# Third party packages
import psutil
# Local modules
import partition_content
import mdfixer

PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent
VERBOSITY_ARGS = {logging.DEBUG:'--debug', logging.INFO:'--verbose', logging.CRITICAL:'--quiet'}
DESCRIPTION = """Build or serve the site."""


def make_argparser():
  parser = argparse.ArgumentParser(prog='build.sh', add_help=False, description=DESCRIPTION)
  options = parser.add_argument_group('Options')
  options.add_argument('action', choices=('build','develop','preprocess'), default='build', nargs='?',
    help='Action. "build" creates the static files for the entire website. "develop" runs a server '
      'which serves the site locally (and builds pages on demand). "preprocess" only sets up the '
      'build directory, but exits before executing the Gridsome build process.')
  options.add_argument('-c', '--config', type=pathlib.Path, default=PROJECT_ROOT/'config.json',
    help='The site configuration file. The location of the important directories will be read from '
      'here. Default: %(default)s')
  options.add_argument('-K', '--keep-old-build', dest='clean', action='store_false', default=True,
    help="Keep the existing build files instead of wiping out the build directories first.")
  options.add_argument('-f', '--fix-markdown', action='store_true',
    help='Modify Markdown files before copying them into the build directories.')
  options.add_argument('-m', '--node-mem', type=float,
    help='How much memory to allow node to take (the --max-old-space-size option). By default, '
      'this will be calculated from the total system memory minus the --reserved-mem.')
  options.add_argument('-M', '--reserved-mem', type=float, default=1,
    help='The amount of memory to reserve for the system. The limit given to node will be the '
      'total amount of system memory minus this many gigabytes. Default: %(default)s')
  options.add_argument('-C', '--check-args', action='store_true',
    help='Return an error if the arguments are invalid. Otherwise do nothing.')
  options.add_argument('-h', '--help', action='store_true',
    help='Print this argument help text and exit.')
  logs = parser.add_argument_group('Logging')
  logs.add_argument('-l', '--log', type=argparse.FileType('w'), default=sys.stderr,
    help='Print log messages to this file instead of to stderr. Warning: Will overwrite the file.')
  volume = logs.add_mutually_exclusive_group()
  volume.add_argument('-q', '--quiet', dest='volume', action='store_const', const=logging.CRITICAL,
    default=logging.WARNING)
  volume.add_argument('-v', '--verbose', dest='volume', action='store_const', const=logging.INFO)
  volume.add_argument('-D', '--debug', dest='volume', action='store_const', const=logging.DEBUG)
  return parser


def main(argv):

  parser = make_argparser()
  args = parser.parse_args(argv[1:])

  logging.basicConfig(stream=args.log, level=args.volume, format='%(message)s')

  if args.help:
    parser.print_help()
    return 1

  if args.check_args:
    return

  config = read_config(args.config)

  os.chdir(PROJECT_ROOT)

  if args.fix_markdown:
    placers = {
      'md':partition_content.copy, 'vue':partition_content.copy, 'insert':partition_content.copy
    }
  else:
    placers = None

  if args.clean:
    clean_build_dirs(config)

  logging.warning('Running partition_content.py..')
  partition_content.preprocess(
    args.config, project_root=PROJECT_ROOT, simulate=False, placers=placers
  )
  if args.fix_markdown:
    logging.warning('Running mdfixer.py..')
    mdfixer.preprocess(args.config, project_root=PROJECT_ROOT, simulate=False)

  if args.action == 'develop':
    logging.warning('Starting hot reloader..')
    command = add_verbosity([PROJECT_ROOT/'scripts/hotreloader.py', args.config])
    subprocess.Popen(command)
    #TODO: Also start mdfixer.mjs in watch mode for the two build directories.

  if args.node_mem:
    node_mem = args.node_mem
  else:
    node_mem = get_node_mem(reserved=args.reserved_mem)
  os.environ['NODE_OPTIONS'] = f'--max-old-space-size={node_mem}'
  logging.warning(f'Using {node_mem} MB memory limit for node.')

  if args.action == 'build':
    subprocess.run(['gridsome', 'build'])
  elif args.action == 'develop':
    try:
      subprocess.run(['gridsome', 'develop'])
    except KeyboardInterrupt:
      pass


def clean_build_dirs(config):
  for build_dir in config['build']['dirs'].values():
    if os.path.exists(build_dir):
      shutil.rmtree(build_dir)


def add_verbosity(orig_command):
  log_level = logging.getLogger().getEffectiveLevel()
  verbosity = VERBOSITY_ARGS.get(log_level)
  if verbosity is None:
    new_command = orig_command
  else:
    new_command = [orig_command[0], verbosity, *orig_command[1:]]
  return new_command


def get_node_mem(reserved=1):
  """Get the amount of memory to give to node, in MB.
  It's the total amount of system memory minus `reserved` GB."""
  mem = psutil.virtual_memory()
  return round(mem.total/1024/1024 - reserved*1024)


def read_config(config_path):
  with config_path.open() as config_file:
    return json.load(config_file)


def fail(message):
  logging.critical(f'Error: {message}')
  if __name__ == '__main__':
    sys.exit(1)
  else:
    raise Exception(message)


if __name__ == '__main__':
  try:
    sys.exit(main(sys.argv))
  except BrokenPipeError:
    pass
