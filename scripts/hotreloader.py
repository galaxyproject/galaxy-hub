#!/usr/bin/env python3
import argparse
import logging
import pathlib
import sys
# Third party packages
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
# Local modules
import partition_content
import vbuild

PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent
DESCRIPTION = """Watch for changes made to the content and take care of the steps necessary before
Gridsome's hot reloader handles them."""


def make_argparser():
  parser = argparse.ArgumentParser(add_help=False, description=DESCRIPTION)
  options = parser.add_argument_group('Options')
  options.add_argument('config', type=pathlib.Path, nargs='?', default=PROJECT_ROOT/'config.json',
    help='Config JSON file for the site. Default: %(default)s')
  options.add_argument('-n', '--simulate', action='store_true')
  options.add_argument('-h', '--help', action='help',
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

  config = vbuild.read_config(args.config)
  content_dir = PROJECT_ROOT/config['contentDir']

  subhandlers = []
  for module in (partition_content,):
    subhandler = module.EventHandler(args.config, project_root=PROJECT_ROOT, simulate=args.simulate)
    subhandlers.append(subhandler)

  event_handler = Handler(subhandlers)
  # Observers seem to follow this interface:
  # https://python-watchdog.readthedocs.io/en/v0.10.3/api.html#watchdog.utils.BaseThread
  observer = Observer()
  observer.schedule(event_handler, content_dir, recursive=True)
  observer.start()
  try:
    while observer.is_alive():
      observer.join(1)
  except KeyboardInterrupt:
    observer.stop()
  observer.join()


class Handler(FileSystemEventHandler):

  def __init__(self, subhandlers):
    self.subhandlers = subhandlers

  def on_any_event(self, event):
    if event.event_type == 'moved':
      old_path = pathlib.Path(event.src_path)
      path = pathlib.Path(event.dest_path)
    else:
      old_path = None
      path = pathlib.Path(event.src_path)
    for subhandler in self.subhandlers:
      subhandler.handle(event.event_type, event.is_directory, path, old_path)


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
