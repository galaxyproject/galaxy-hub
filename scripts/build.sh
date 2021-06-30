#!/usr/bin/env bash
if [ "x$BASH" = x ] || [ ! "$BASH_VERSINFO" ] || [ "$BASH_VERSINFO" -lt 3 ]; then
  echo "Error: Must use bash version 3+." >&2
  exit 1
fi
set -ue
unset CDPATH

# This wrapper takes care of things that can't be done in Python.
# Specifically, it creates and/or activates the virtualenv.
# Then it calls the Python build script.

function main {

  script_dir=$(dirname "$(readlink_f "${BASH_SOURCE[0]}")")
  project_dir=$(dirname "$script_dir")

  # Activate the virtualenv, installing if necessary.
  venv_dir="$project_dir/.venv"
  if [[ -d "$venv_dir" ]]; then
    activate_venv "$venv_dir"
    #TODO: Make sure the installed packages are up to date with requirements.txt?
  else
    printf 'No virtualenv found in %s\n' "$venv_dir" >&2
    printf 'Installing..\n' >&2
    create_venv "$venv_dir"
    activate_venv "$venv_dir"
    install_requirements "$project_dir/requirements.txt"
  fi

  # Switch to Python for everything else.
  "$script_dir/vbuild.py" "$@"
}

function create_venv {
  venv_dir="$1"
  if ! which virtualenv >/dev/null 2>/dev/null; then
    install_virtualenv
  fi
  py3=$(which python3)
  virtualenv -p "$py3" "$venv_dir"
}

function activate_venv {
  venv_dir="$1"
  if [[ -f "$venv_dir/bin/activate" ]]; then
    source "$venv_dir/bin/activate"
  else
    fail "Error: Virtualenv directory $venv_dir exists but contains no bin/activate"
  fi
}

function install_requirements {
  requirements="$1"
  python3 -m pip install -r "$requirements"
}

function install_virtualenv {
  python3 -m pip install --user virtualenv
  if which virtualenv >/dev/null 2>/dev/null; then
    return
  fi
  # Try to get it on the $PATH
  user_base="$(python3 -m site --user-base)"
  bin_dir="$user_base/bin"
  if [[ -x "$bin_dir/virtualenv" ]]; then
    export PATH="$PATH:$bin_dir"
  fi
  if ! which virtualenv >/dev/null 2>/dev/null; then
    fail 'Error: Could not install virtualenv into a directory on the $PATH'
  fi
}

function readlink_f {
  if readlink -f dummy >/dev/null 2>/dev/null; then
    readlink -f "$1"
  else
    perl -MCwd -le 'print Cwd::abs_path(shift)' "$1"
  fi
}

function fail {
  echo "Error: $@" >&2
  exit 1
}

main "$@"
