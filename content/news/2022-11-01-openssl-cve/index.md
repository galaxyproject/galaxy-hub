---
title: Impact on Galaxy of OpenSSL 3.0.x Vulnerabilities CVE-2022-3602 and CVE-2022-3786 ("Spooky SSL")
tease: Official severity downgraded to HIGH, exploitability and impact to Galaxy is very low
date: '2022-11-01'
tags: [galaxy, admin, security]
subsites: [global]
authors: Nate Coraor and Helena Rasche
authors_structured:
- github: natefoo
- github: hexylena
---

On October 25, the OpenSSL team announced that a new version would be released on November 1, containing "CRITICAL" fixes for security vulnerabilities, suggesting exploitation would be possible under common deployment circumstances. Now that the details of these vulnerabilities have been released, we have been able to perform an assessment of their impact on Galaxy. At the time of release, the vulnerability was downgraded in severity from CRITICAL to HIGH, and further analysis by security experts indicates that the exploitability of the vulnerabilities is very low. **As a result, the exploitability against a Galaxy service is also very low.**

Please see the [official disclosure page](https://www.openssl.org/blog/blog/2022/11/01/email-address-overflows/) for details, and the <abbr title="Dutch National Cyber Security Center">NCSC-NL</abbr> has provided a [list of vulnerable OSes, software, and products](https://github.com/NCSC-NL/OpenSSL-2022). You can find a good technical discussion of the vulnerabilities and their exploitability [in this repository](https://github.com/colmmacc/CVE-2022-3602).

An attacker would need both an SSL certificate containing malicious content, and that certificate would need to be signed by a Certificate Authority trusted by a vulnerable OpenSSL client library in Galaxy. Obtaining such a certificate is likely impossible, and even if possible, the compiler likely has protected against this bug regardless, and so a remote code execution exploit is exceedingly unlikely to be possible, with the worst case (and still unlikely) scenario to be a denial of service via a crash.

With all of that said, it is still a good idea to ensure that your OpenSSL versions are up to date, in the unlikely event that a practical exploit does become available, and because many institutions actively scan for versions of software with known vulnerabilities present on systems.

As always, before addressing Galaxy itself, the best security practice is always to keep your operating system up to date, which may also update Galaxy's OpenSSL as described in point 1. This is done using `sudo apt update && sudo apt upgrade` on Debian-based Linux distributions (including Ubuntu) and `sudo yum update` or `sudo dnf update` on RedHat-based distributions (including CentOS and Rocky).

There are three points in Galaxy which need to be considered. In the examples below, the paths are those used by the [GTN Galaxy Installation with Ansible tutorial](https://training.galaxyproject.org/training-material/topics/admin/tutorials/ansible-galaxy/tutorial.html), so your paths may be different.

1. **Galaxy's Python interpreter:** Python ships an SSL library that is dynamically linked against OpenSSL. Which OpenSSL library it is linked against will depend on what Python you used to create Galaxy's virtualenv. The easiest way to find this out is to inspect the Python `_ssl` module:

   ```console
   $ . /srv/galaxy/venv/bin/activate
   $ python3 -c 'import _ssl; print(_ssl.__file__)'
   /usr/lib/python3.9/lib-dynload/_ssl.cpython-39-x86_64-linux-gnu.so
   $ ldd /usr/lib/python3.9/lib-dynload/_ssl.cpython-39-x86_64-linux-gnu.so
       linux-vdso.so.1 (0x00007ffffe8e0000)
       libssl.so.1.1 => /usr/lib/x86_64-linux-gnu/libssl.so.1.1 (0x00007f3f949cb000)
       libcrypto.so.1.1 => /usr/lib/x86_64-linux-gnu/libcrypto.so.1.1 (0x00007f3f946d7000)
       libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f3f946b5000)
       libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f3f944e0000)
       libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f3f944da000)
       /lib64/ld-linux-x86-64.so.2 (0x00007f3f94aa9000)
   ```

   In this instance, Python's SSL library is linked against the system's OpenSSL library (`/usr/lib/x86_64-linux-gnu/libssl.so.1.1`). This also happens to be a non-vulnerable OpenSSL version (1.1.1n), but regardless, performing your OS package updates as described above will ensure that this library has all applicable security updates applied.

   <br/>

   In the event that Galaxy's virtualenv is created from Conda, the path to the `_ssl.cpython` library `.so` file will be in a Conda environment. In this case, the version of OpenSSL can be determined from Conda (the name of the Conda environment can be determined from the `.so` path - it is the subdirectory after `/envs/`:

   ```console
   $ . /srv/galaxy/venv/bin/activate
   $ python3 -c 'import _ssl; print(_ssl.__file__)'
   /srv/galaxy/var/dependencies/_conda/envs/_galaxy_/lib/python3.8/lib-dynload/_ssl.cpython-38-x86_64-linux-gnu.so
   $ ldd /srv/galaxy/var/dependencies/_conda/envs/_galaxy_/lib/python3.8/lib-dynload/_ssl.cpython-38-x86_64-linux-gnu.so
       linux-vdso.so.1 (0x00007ffe966b2000)
       libssl.so.3 => /srv/galaxy/var/dependencies/_conda/envs/_galaxy_/lib/python3.8/lib-dynload/../../libssl.so.3 (0x00007f9aa71d2000)
       libcrypto.so.3 => /srv/galaxy/var/dependencies/_conda/envs/_galaxy_/lib/python3.8/lib-dynload/../../libcrypto.so.3 (0x00007f9aa6d9e000)
       libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f9aa6d60000)
       libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f9aa6b8b000)
       libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f9aa6b85000)
       /lib64/ld-linux-x86-64.so.2 (0x00007f9aa72ad000)
   $ /srv/galaxy/var/dependencies/_conda/bin/conda list -n _galaxy_ openssl
   # packages in environment at /srv/galaxy/var/dependencies/_conda/envs/_galaxy_:
   #
   # Name                    Version                   Build  Channel
   openssl                   3.0.0                h7f98852_2    conda-forge
   ```

   This version can be updated using conda:

   ```console
   $ /srv/galaxy/var/dependencies/_conda/bin/conda update -n _galaxy_ --override-channels -c conda-forge openssl
   ```

   Restart Galaxy after any changes are made.

   <br/>

2. **Galaxy's Framework Dependencies:** Galaxy depends on a multitude of 3rd-party Python libraries, and it is possible (although uncommon) for them to include a copy of an OpenSSL. However, as of Galaxy 22.05, at least one dependency - cryptography - does:

   ```console
   $ readelf -a /srv/galaxy/venv/lib/python3.8/site-packages/cryptography/hazmat/bindings/_openssl.abi3.so | grep -i ossl_punycode_decode
    11111: 0000000000334e70   714 FUNC    LOCAL  DEFAULT   11 ossl_punycode_decode
   ```

   You should also be able to extract the version string:

   ```console
   $ strings /srv/galaxy/venv/lib/python3.8/site-packages/cryptography/hazmat/bindings/_openssl.abi3.so | grep 'OpenSSL [0-9]'
   OpenSSL 3.0.3 3 May 2022
   ```

   [Cryptography 38.0.3](https://github.com/pyca/cryptography/issues/7758), released today, addresses this with an update to OpenSSL 3.0.7. The new version of cryptography has been [pinned in Galaxy 22.05 in an update](https://github.com/galaxyproject/galaxy/pull/14904) also released today. If you are running Galaxy 22.05, you can receive the update by performing a Galaxy update using your normal update procedure (with Ansible, or `git pull && sh ./scripts/common_startup.sh`).

   <br/>

   Restart Galaxy after any changes are made.

   <br/>

   Cryptography only began using OpenSSL 3 as of version 37, and Galaxy 22.01 uses cryptography 36, so it and earlier versions of Galaxy are not affected.

   <br/>

   If you want to be absolutely certain that another affected OpenSSL library is not present in Galaxy's virtualenv, you can use the following command to check:

   ```console
   $ . /srv/galaxy/venv/bin/activate
   $ for so in $(find $VIRTUAL_ENV -type f -name '*.so'); do readelf -a $so | grep -q ossl_punycode_decode "$so" && echo "$so"; done
   ```

   Replace `*.so` with `*.dylib` on macOS.

   <br/>

3. **Galaxy tool dependencies:** In most cases, your Galaxy server's tool dependencies are provided by Conda or BioContainers run in Docker or Singularity. It is likely that you have *many* copies of OpenSSL installed for dependencies, some of which will be affected versions if you have installed or updated tools in the past year (since OpenSSL 3 was released). However, the exploitability of tool dependencies is even lower than in Galaxy itself, since most tools cannot be used to make SSL client connections to arbitrary services on the Internet. The most notable exceptions - such as the upload and data source tools - use the Galaxy virtualenv, which was addressed in points 1 and 2.

   <br/>

   Anaconda [compiles its binaries with many of the same protections](https://www.anaconda.com/blog/improved-security-performance-in-anaconda-distribution-5) that your operating system probably does, negating the potential of an attack. However, this doesn't necessarily extend to conda-forge or bioconda. You can use [`hardening-check`](https://manpages.debian.org/testing/devscripts/hardening-check.1.en.html) if you wish to check individual binaries for features like stack protections and similar. Most binaries provided via bioconda are using <abbr title="Address space layout randomization">ASLR</abbr> which *significantly* increases the difficulty of this attack.

   <br/>

   If you are using Conda for dependencies and wish to ensure you do not have an affected OpenSSL version installed in your dependencies, locate your Conda installation (by default it is in `database/dependencies/_conda` when running from source, or `/srv/galaxy/var/dependencies/_conda` for the GTN Ansible-based Galaxy install) and inspect the package versions in your environments. For example:

   ```console
   $ ls -d /srv/galaxy/var/dependencies/_conda/envs/*/conda-meta/openssl-3*
   /srv/galaxy/var/dependencies/_conda/envs/__unicycler@5.0/conda-meta/openssl-3.0.0-h7f98852_2.json
   ```

   As in point 1, you can update this using `conda update`:

   ```console
   $ /srv/galaxy/var/dependencies/_conda/bin/conda update -n __unicycler@5.0 --override-channels -c conda-forge openssl
   ```

   If you are using BioContainers for dependencies, you are additionally protected by the fact that even if the vulnerabilities were exploitable, your tools run in containers, so a successful exploit would be trapped inside a relatively unprivileged container. For maximum security, do ensure that you have enabled `outputs_to_working_directory` on any containerized Galaxy job destinations that do not use Pulsar - this ensures that your datasets directory is mounted read-only into the tool container.

   <br/>

   The [BioContainers project](https://biocontainers.pro/) actively scans for vulnerabilities in containers and releases new builds as necessary. This is currently under way and a decision will be made as to whether the severity of the exploit warrants rebuilding affected containers.

If you have questions or difficulties, please don't hesitate to reach out on the [Galaxy Admins Matrix channel](https://matrix.to/#/#galaxyproject_admins:gitter.im).

Special thanks to Helena Rasche and Björn Grüning for their involvement in assessing this vulnerability.
