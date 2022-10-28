#!/usr/bin/env python3
import argparse
import datetime
import logging
import pathlib
import re
import subprocess
import sys
import yaml
from utillib import graymatter

KEY_YAML_SETTINGS = {
  'subsites': {'default_flow_style':None},
  'tags': {'default_flow_style':None},
}
FIRST_FIELDS = ('title', 'date', 'end', 'tease', 'hide_tease')
LAST_FIELDS = ('subsites', 'main_subsite')
DESCRIPTION = """Automate most of the steps in importing content from .eu"""


def make_argparser():
  parser = argparse.ArgumentParser(add_help=False, description=DESCRIPTION)
  options = parser.add_argument_group('Options')
  options.add_argument('output_dir', type=pathlib.Path, nargs='?',
    help='The directory to create the galaxy-hub post in. This is where this script will create a '
      'directory containing an index.md. Omit to just print the metadata to stdout.')
  options.add_argument('input_path', metavar='path/to/post.md', type=pathlib.Path,
    help='The .eu post Markdown file.')
  options.add_argument('-T', '--skip-tease', dest='add_tease', default=True, action='store_false')
  options.add_argument('-n', '--simulate', action='store_true',
    help="Don't actually make any changes to the filesystem.")
  options.add_argument('-o', '--open-md', action='store_true',
    help='Open the output Markdown file in Mousepad afterward.')
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

  with args.input_path.open() as md_file:
    old_metadata, content = graymatter.parse(md_file)

  if old_metadata is None:
    fail(f'No metadata in {args.input_path}')
  if 'site' not in old_metadata:
    fail(f'No "site" key in {args.input_path}')

  new_metadata = make_metadata(args.input_path, old_metadata, content, add_tease=args.add_tease)
  new_metadata_str = serialize_metadata(new_metadata)

  if args.output_dir is None:
    print(new_metadata_str)
    return 0

  # Create the output directory name.
  filename = fix_filename_date(args.input_path.stem, new_metadata.get('date'))
  post_dir = args.output_dir / slugify(filename)

  # Create the directory.
  logging.info(f'Creating post directory: {post_dir}')
  if not args.simulate:
    if post_dir.exists():
      fail(f'Post directory already exists: {post_dir}')
    post_dir.mkdir()

  #TODO: Modify content?
  #      - Convert links to galaxyproject.org to local links.
  #      - Convert local links to galaxyproject.eu links?

  # Write the Markdown file.
  post_file = post_dir/'index.md'
  if args.volume < logging.CRITICAL:
    print(f'Markdown file: {post_file}')
  if not args.simulate:
    with post_file.open('w') as post_fh:
      if new_metadata_str:
        print('---\n'+new_metadata_str+'---', file=post_fh)
      print(content, file=post_fh)

  # Extra, post-porting convenience functions.
  if args.open_md and not args.simulate:
    subprocess.run(['mousepad', post_file], stdout=subprocess.DEVNULL)
  if args.volume < logging.CRITICAL:
    print('URLs:')
    print('\t'+make_org_url(post_dir))
    print('\t'+get_eu_url(args.input_path))


def make_metadata(input_path, old_metadata, content, add_tease=True):

  # Modify keys and values as necessary.
  new_metadata = {}
  for key, value in old_metadata.items():
    if key == 'site':
      # `site` -> `subsites`
      new_key = 'subsites'
      new_value = cast_to_list(key, value)
    elif key == 'starts':
      # `starts` -> `date`
      new_key = 'date'
      new_value = str(value)
    elif key == 'ends':
      # `ends` -> `end`
      new_key = 'end'
      new_value = str(value)
    elif key == 'external':
      # `external` -> `external_url`
      new_key = 'external_url'
      new_value = value
    elif key == 'author':
      # `author` -> `authors`
      new_key = 'authors'
      new_value = value
    elif key in ('author_name', 'author_github'):
      # `author_name` and `author_github`: Pluralize key and ensure it's a list.
      # We'll structure this data in a later step.
      new_key = key+'s'
      new_value = cast_to_list(key, value)
    elif key in ('organiser', 'organisers'):
      # `organiser` -> `contacts`
      new_key = 'contacts'
      if isinstance(value, list):
        for item in value:
          validate_dict(item, {'name', 'email'}, {'name'})
        new_value = value
      elif isinstance(value, dict):
        validate_dict(value, {'name', 'email'}, {'name'})
        new_value = [value]
      elif isinstance(value, str):
        new_value = [{'name':value}]
      else:
        raise TypeError(f'{key!r} value is invalid type: {value!r}')
    elif key == 'location':
      # `location`: Make sure it's a dict.
      new_key = 'location'
      if isinstance(value, dict):
        new_value = value
      elif isinstance(value, str):
        new_value = {'name':value}
      else:
        raise TypeError(f'{key!r} value is invalid type: {value!r}')
    elif key == 'tags':
      # `tags`: Make sure it's a list.
      new_key = key
      new_value = cast_to_list(key, value)
    elif key in ('supporters', 'supporter'):
      # `supporters`: Make sure it's a list.
      new_key = 'supporters'
      new_value = cast_to_list(key, value)
    else:
      new_key = key
      new_value = value
    if new_key in new_metadata:
      raise RuntimeError(f'Duplicate key {new_key!r}')
    new_metadata[new_key] = new_value

  # Some post-processing on the `subsites` field.
  subsites = new_metadata.setdefault('subsites', [])
  if 'main_subsite' not in new_metadata:
    if len(subsites) == 1:
      new_metadata['main_subsite'] = subsites[0]
    else:
      new_metadata['main_subsite'] = 'eu'
  if 'eu' not in subsites:
    subsites.insert(0, 'eu')

  # Infer the date from the filename, if necessary.
  if not new_metadata.get('date'):
    date_str = input_path.name[:10]
    try:
      datetime.datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
      raise RuntimeError(f'Filename {input_path.name!r} does not include a valid date.') from None
    new_metadata['date'] = date_str

  # Put any structured author data into a field designed for it.
  if 'author_names' in new_metadata or 'author_githubs' in new_metadata:
    author_names = new_metadata.get('author_names', ())
    author_githubs = new_metadata.get('author_githubs', ())
    if author_names and author_githubs:
      raise RuntimeError(f'author_name and author_github are both defined: {author_names}, {author_githubs}')
    elif author_names:
      authors = ', '.join(author_names)
      authors_structured = [{'name':name} for name in author_names]
      del new_metadata['author_names']
    elif author_githubs:
      authors = ', '.join(author_githubs)
      authors_structured = [{'github':github} for github in author_githubs]
      del new_metadata['author_githubs']
    new_metadata['authors'] = authors
    new_metadata['authors_structured'] = authors_structured

  # Add (an attempt at) an automatic tease derived from the content.
  # This requires manual review but is usually a good start.
  if add_tease and 'tease' not in new_metadata:
    tease = extract_tease(content)
    if tease:
      new_metadata['tease'] = tease
      new_metadata['hide_tease'] = True

  # Tool updates should appear on the eu subsite too.
  if is_tool_update(new_metadata) and new_metadata.get('subsites') == ['freiburg']:
    new_metadata['subsites'].append('eu')

  return new_metadata


def serialize_metadata(metadata):
  """Serialize metadata into a single string, in the proper order and with custom per-key formatting."""
  metadata_str = ''
  for key in FIRST_FIELDS:
    metadata_str += make_metadata_line(key, metadata.get(key))
  for key, value in metadata.items():
    if key not in FIRST_FIELDS and key not in LAST_FIELDS:
      metadata_str += make_metadata_line(key, value)
  for key in LAST_FIELDS:
    metadata_str += make_metadata_line(key, metadata.get(key))
  return metadata_str


def make_metadata_line(key, value):
  if value is not None:
    kwargs = KEY_YAML_SETTINGS.get(key, {})
    return yaml.dump({key: value}, allow_unicode=True, **kwargs)
  else:
    return ''


def validate_dict(dict_, keys, required_keys=frozenset()):
  if not isinstance(dict_, dict):
    raise TypeError(f"Value not a dict: {dict_!r}")
  for key in dict_:
    if key not in keys:
      raise ValueError(f"Found invalid key {key!r} in {dict_!r}")
  for key in required_keys:
    if key not in dict_:
      raise ValueError(f"Required key {key!r} missing in {dict_!r}")


def cast_to_list(key, value):
  if value is None:
    return value
  elif isinstance(value, list):
    return value
  elif isinstance(value, str):
    return [value]
  else:
    raise TypeError(f'{key!r} value is invalid type: {value!r}')


def extract_tease(content):
  # Tool update?
  # These don't end in a period+space so they won't be caught by the sentence finder.
  for line in content.splitlines():
    match = re.search(
      r'^(On 202\d-\d{2}-\d{2}, the tools on UseGalaxy\.eu were updated by our automated tool update and installation '
      r'process in )\[(Jenkins Build #\d{1,6})\]',
      line, re.IGNORECASE
    )
    if match:
      return match.group(1)+match.group(2)
  # Otherwise, find what looks like the first sentence.
  sentences = content.split('. ')
  if len(sentences) >= 1:
    tease = sentences[0].replace('\n', ' ').strip()
    if len(tease) > 400:
      return tease[:399]+'…'
    else:
      return tease+'.'


def is_tool_update(metadata):
  title = metadata.get('title', '')
  return re.search(r'^UseGalaxy.eu Tool Updates for 202\d-\d{2}-\d{2}$', title)


def fix_filename_date(filename, date_str):
  if date_str and not filename.startswith(date_str):
    logging.warning(f'Warning: The date in the filename is different from the date in the metadata ({date_str}).')
    return date_str+filename[10:]
  else:
    return filename


def slugify(raw_str):
  last = 0
  output = ''
  for match in re.finditer(r'[a-z][A-Z][^A-Z]', raw_str):
    start, end = match.start(), match.end()
    frag = match.group()
    output += raw_str[last:start]
    output += frag[0]+'-'+frag[1:]
    logging.info(f'{start} {end} {frag}')
    last = match.end()
  output += raw_str[last:]
  return output.replace('_', '-').replace('.', '-').lower()


def make_org_url(post_dir):
  parts = []
  for part in reversed(post_dir.parts):
    if part == 'content':
      break
    parts.insert(0, part)
  return 'http://localhost:8080/'+'/'.join(parts)+'/'


def get_eu_url(md_path):
  dirname = md_path.parent.name
  if dirname == '_events':
    path = f'event/{md_path.stem}/'
  elif dirname == '_posts':
    date_str = md_path.name[:10]
    date = datetime.datetime.strptime(date_str, '%Y-%m-%d')
    name = md_path.stem[11:]
    path = f'posts/{date.year}/{date.month:02}/{date.day:02}/{name}/'
  else:
    return None
  return 'https://galaxyproject.eu/'+path


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
