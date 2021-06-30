#!/usr/bin/env python3
import argparse
import logging
import os
import pathlib
import shutil
import sys
# Local modules
import graymatter
import vbuild

PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent
DESCRIPTION = """Copy or link the content files into the right build directories."""


def make_argparser():
  parser = argparse.ArgumentParser(add_help=False, description=DESCRIPTION)
  options = parser.add_argument_group('Options')
  options.add_argument('config', metavar='config.json', type=pathlib.Path, nargs='?',
    default=PROJECT_ROOT/'config.json',
    help='The site configuration file. The location of the important directories will be read from '
      'here.')
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

  preprocess(args.config, project_root=PROJECT_ROOT, simulate=args.simulate)


def preprocess(config_path, project_root=PROJECT_ROOT, simulate=True, placers=None):
  handler = EventHandler(config_path, project_root=project_root, simulate=simulate, placers=placers)
  # Make sure the build directories exist.
  for dir_path in handler.build_dirs.values():
    if not simulate:
      dir_path.mkdir(parents=True, exist_ok=True)
  # Arrange the content in the build directories.
  handler.place_dir_files(handler.content_dir, recursive=True)


# Placers
# Each must take 3 arguments: source path, destination path, and `simulate`.

def copy(src_file_path, dst_file_path, simulate=True):
  # If the file already exists, only overwrite if the source file was last modified later than
  # the existing file.
  #TODO: Check if this makes a big speed difference.
  if (not dst_file_path.exists() or dst_file_path.is_symlink() or
      os.path.getmtime(src_file_path) > os.path.getmtime(dst_file_path)):
    logging.info(f'copy {src_file_path} -> {dst_file_path}')
    if not simulate:
      shutil.copy2(src_file_path, dst_file_path)


def link(src_file_path, dst_file_path, simulate=True):
  link_path = pathlib.Path(os.path.relpath(src_file_path, start=dst_file_path.parent))
  logging.info(f'link {dst_file_path} -> {link_path}')
  if not simulate:
    # If it already exists, overwrite it, to make sure the link points to the right file.
    if dst_file_path.exists():
      os.remove(dst_file_path)
    os.symlink(link_path, dst_file_path)


class EventHandler:

  def __init__(self, config_path, project_root=PROJECT_ROOT, simulate=True, placers=None):
    config = vbuild.read_config(config_path)
    self.simulate = simulate
    self.content_dir = project_root/config['contentDir']
    self.build_dirs = {}
    for key, rel_dir in config['build']['dirs'].items():
      self.build_dirs[key] = project_root/rel_dir
    self.placers = {'md':link, 'vue':copy, 'insert':link, 'resource':link}
    if placers is not None:
      self.placers.update(placers)

  @property
  def md_content_dir(self):
    return self.build_dirs['md']

  @property
  def vue_content_dir(self):
    return self.build_dirs['vue']

  def place_dir_files(self, dir_path, recursive=False):
    dirs, index_path, inserts, resources = get_children_by_type(dir_path)
    if recursive:
      # Execute depth-first - take care of bottom-most directories before their parents.
      for child_dir in dirs:
        self.place_dir_files(child_dir, recursive=recursive)
    plan = self.make_dir_plan(index_path, inserts, resources)
    self.execute_dir_plan(dir_path, plan)
    if recursive:
      # Delete empty directories.
      # Because we've taken care of the child directories already (recursively), everything below
      # should already be in the intended final state.
      delete_empty_dirs(dir_path)

  def make_dir_plan(self, index_path, inserts, resources):
    """Determine what the final state of the files in this directory should be.
    What files should be present in which destination directories, and should they be links or
    copies?"""
    plan = []
    vue = index_path and file_requires_vue(index_path)
    # index.md
    if index_path is None:
      pass
    elif vue:
      plan.append({'path':index_path, 'dest':'vue', 'method':self.placers['vue']})
    else:
      plan.append({'path':index_path, 'dest':'md', 'method':self.placers['md']})
    # Insert .md files
    for insert_path in inserts:
      plan.append({'path':insert_path, 'dest':'md', 'method':self.placers['insert']})
    # Resource files (mainly images)
    for resource_file in resources:
      # Check if the file is used by a Vue-requiring Markdown file.
      #TODO: It's possible a file could be referenced by multiple Markdowns in the same directory.
      #TODO: This is a very loose check for whether the Markdown file references the resource file.
      #      The Markdown file could technically include the name of the resource file without
      #      actually including it in, say, an image element.
      if vue and file_contains_substr(index_path, resource_file.name):
        destination = 'vue'
      else:
        destination = 'md'
      plan.append({'path':resource_file, 'dest':destination, 'method':self.placers['resource']})
    return plan

  def execute_dir_plan(self, dir_path, plan):
    """Create the state described in the `plan` in the directory given with `dir_path`.
    Delete files not present in the final state.
    Directories are not touched."""
    child_paths = {'vue':set(), 'md':set()}
    for action in plan:
      child_paths[action['dest']].add(action['path'].relative_to(self.content_dir))
      self.place_content_file(action['method'], action['path'], self.build_dirs[action['dest']])
    rel_dir = dir_path.relative_to(self.content_dir)
    for content_type, build_dir_root in self.build_dirs.items():
      build_dir = build_dir_root/rel_dir
      if build_dir.is_dir():
        build_dir_contents = list(build_dir.iterdir())
      elif build_dir.exists():
        raise OSError(f'Path {build_dir} exists but is not a directory.')
      else:
        build_dir_contents = ()
      for child_path in build_dir_contents:
        if child_path.is_dir():
          # Directories are handled outside this function.
          continue
        rel_path = child_path.relative_to(build_dir_root)
        if rel_path not in child_paths[content_type]:
          os.remove(child_path)

  def handle(self, event_type, is_dir, path, old_path=None):
    dirs_to_check = {'deep':[], 'shallow':[]}
    if event_type == 'created':
      if is_dir:
        dirs_to_check['deep'].append(path)
      else:
        # If it's a Markdown file, that could affect where its directory should be placed in the
        # build. If it's a resource file, we have to check the Markdown files in that directory to
        # tell where it should be placed.
        dirs_to_check['shallow'].append(path.parent)
    elif event_type == 'deleted':
      self.delete_from_build(path)
      if not is_dir and path.suffix.lower() == '.md':
        # It's a Markdown file, so removing it could affect where its directory should be in the
        # build.
        dirs_to_check['shallow'].append(path.parent)
    elif event_type == 'moved':
      if is_dir:
        # It's a directory. We don't know where its children belong, so just delete it from the
        # build and do a full examination of it and its children.
        self.delete_from_build(old_path)
        dirs_to_check['deep'].append(path)
      elif path.suffix.lower() == '.md' or old_path.suffix.lower() == '.md':
        # It's a Markdown file, so putting it somewhere else could affect where its directory should
        # be placed in the build. (But it won't affect the child directories.)
        dirs_to_check['shallow'].append(old_path.parent)
        dirs_to_check['shallow'].append(path.parent)
      else:
        # It's a non-Markdown file. Can't affect anything else so just move that one file.
        self.build_mv(old_path, path)
    elif event_type == 'modified':
      # Events that modify directories are usually changes to its contents. These are handled by
      # events on the files themselves. Other directory changes, like permissions, aren't covered.
      if not is_dir:
        dirs_to_check['shallow'].append(path.parent)
    for dir_path in dirs_to_check['shallow']:
      self.place_dir_files(dir_path)
    for dir_path in dirs_to_check['deep']:
      self.place_dir_files(dir_path, recursive=True)

  def place_content_file(self, method, src_file_path, dst_content_dir):
    rel_file_path = src_file_path.relative_to(self.content_dir)
    dst_file_path = dst_content_dir/rel_file_path
    if dst_file_path.exists():
      logging.debug(f'{dst_file_path} already exists')
      return
    dst_file_dir = dst_file_path.parent
    dst_file_dir.mkdir(parents=True, exist_ok=True)
    if dst_file_path.exists() and not dst_file_path.is_file():
      logging.error(f'Error: Path already exists but is not a file: {dst_file_path}')
      return
    method(src_file_path, dst_file_path, self.simulate)

  def delete_from_build(self, path):
    rel_path = path.relative_to(self.content_dir)
    for build_dir in self.build_dirs.values():
      build_path = build_dir/rel_path
      existed = True
      if build_path.is_symlink() or build_path.is_file():
        if not self.simulate:
          os.remove(build_path)
      elif build_path.is_dir():
        if not self.simulate:
          shutil.rmtree(build_path)
      elif build_path.exists():
        raise OSError(f'Cannot remove special file {build_path}')
      else:
        existed = False
      if existed:
        logging.info(f'rm {build_path}')
        if not self.simulate:
          delete_empty_dirs(build_path.parent)

  def build_mv(self, old_path, new_path):
    old_rel = old_path.relative_to(self.content_dir)
    new_rel = new_path.relative_to(self.content_dir)
    for build_dir in self.build_dirs.values():
      old_build_path = build_dir/old_rel
      new_build_path = build_dir/new_rel
      if old_build_path.exists():
        logging.info(f'mv {old_build_path} -> {new_build_path}')
        if not self.simulate:
          os.renames(old_build_path, new_build_path)


def get_children_by_type(dir_path):
  dirs = []
  index_path = None
  inserts = []
  resources = []
  for child_path in dir_path.iterdir():
    if child_path.is_dir():
      dirs.append(child_path)
    elif child_path.is_file():
      if child_path.name.lower() == 'index.md':
        index_path = child_path
      elif child_path.suffix.lower() == '.md':
        inserts.append(child_path)
      else:
        resources.append(child_path)
    else:
      logging.warning(f'Warning: Special file found: {child_path}')
  return dirs, index_path, inserts, resources


def delete_empty_dirs(dir_path):
  """Delete any empty directories in the tree rooted at `dir_path`, including `dir_path`."""
  for child_path in dir_path.iterdir():
    if child_path.is_dir():
      delete_empty_dirs(child_path)
  # Iterdirs again because the above loop might've deleted some.
  if not list(dir_path.iterdir()):
    os.rmdir(dir_path)


def file_contains_substr(file_path, substr):
  with file_path.open() as file:
    contents = file.read()
  return substr in contents


def file_requires_vue(file_path):
  """Read the file to see if it requires `vue-remark`.
  Returns `True` if `components: true` is in the graymatter or if it finds `<slot ` or `<g-image `
  in the file contents."""
  with file_path.open() as file:
    try:
      metadata, content = graymatter.parse(file)
    except ValueError as error:
      logging.warning(f'Warning: Could not parse {file_path}: {error}')
      return None
  if isinstance(metadata, dict) and metadata.get('components') == True:
    return True
  if file_contains_components(content, ('slot', 'g-image')):
    return True
  return False


def file_contains_components(file_contents, components):
  query_strings = [f'<{tag} ' for tag in components]
  for line in file_contents.splitlines():
    for query in query_strings:
      if query in line:
        return True
  return False


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
