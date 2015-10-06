Occasionally, it is necessary to perform additional initialization steps after a cluster is launched. This can be done in an automated fashion by capturing the required actions in a bash script, uploading it to a publicly available URL and feeding it to !CloudMan as a Post Start Script (PSS) via [user data](/CloudMan/UserData). The PSS script will be downloaded from the provided URL, executed, and then stored in the cluster's bucket. 

PSS are resolved in the following order:

1. If a `post_start_script_url` (for master) or `worker_post_start_script_url` (for worker) is defined in user_data, it is processed first. These can be semi-colon separated lists, in which case they are executed one at a time, and can contain http paths, filenames or local file paths. For example: `http://domain.org/scripts/myscript.sh;/opt/app/start.d;bucket_script.sh;/opt/app/poststart.d;` `file:///opt/app/mystartup.d;hello`. For each url found, the following rules apply:
  1. If the url is an http url, the file is downloaded and executed
  2. If it's a filename only (no path), the cluster bucket will be first checked for the filename, and if it exists, downloaded and executed. Otherwise, the script will be assumed to be local and executed from the system path.
  3. If the path refers to a local directory, all scripts in that directory will be executed using the run-parts utility. (Refer to Ubuntu man pages for documentation on run-parts). Note that by default, run-parts does not execute files with extensions, and therefore, scripts should be marked as executable but should not contain an extension such as .sh
  4. If it's a file in a local filesystem path, the script will be directly executed.
2. If these URL's are not defined in the user data, execution falls back to legacy behaviour,
by checking if files `post_start_script` or `worker_post_start_script`, for master
and worker respectively, exist in the cluster bucket. If available, they are downloaded
and executed.
