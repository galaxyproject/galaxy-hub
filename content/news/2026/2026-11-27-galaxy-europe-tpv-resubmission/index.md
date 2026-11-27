---
title: "TPV Resubmissions and OOM handling"
date: '2026-11-27'
tease: "How usegalaxy.eu moved OOM job resubmission from an HTCondor cron job into Galaxy and TPV"
tags: [tpv, htcondor, devops, infrastructure, jobs, resubmission]
subsites: [all, esg, eu, freiburg]
main_subsite: eu
contributions:
  authorship:
    - gsaudade99
    - mira-miracoli
    - domgz
  funding:
    - eu
    - elixir-europe
    - uni-freiburg
    - deNBI
---

# TPV Resubmissions and OOM handling

In our [previous post about switching Galaxy Europe to containers](/news/2026-11-11-galaxy-europe-container-switch/), we talked about how we simplified our Total Perspective Vortex (TPV) destinations and moved all ~4,000 tools into containers. Not long after that, we tackled another foundational piece of our job execution pipeline: how Galaxy Europe handles jobs that run out of memory (OOM).

Between August and November 2026, we moved OOM job resubmission away from an external HTCondor cron script and directly into Galaxy and TPV. Like most infrastructure migrations on a busy public server, what sounded like "just turn on resubmission in TPV" turned into a tour through Galaxy's HTCondor runner, TPV rule evaluation order, sticky working directories, and even a few upstream fixes. If you are already familiar with TPV and just want the takeaways, feel free to jump to the **TL;DR** blocks. For everyone else, we hope this serves as both a peek under Galaxy Europe's hood and a practical guide for other admins considering TPV native resubmissions.

## Out of Memory and Cron Jobs – How we used to handle it

Bioinformatics workloads are notoriously unpredictable when it comes to memory. The same tool might happily finish in 4 GB on one dataset and suddenly need 64 GB on another. We rely on the community mantained [TPV Shared Database](https://github.com/galaxyproject/tpv-shared-database) and our own TPV rules to give tools sensible starting allocations, but no estimate is perfect. When a job exceeds its memory limit on a compute node, HTCondor puts it on hold.

For years, Galaxy Europe handled these held jobs outside of Galaxy using a cron script on our head node that ran every 15 minutes:

1. Find HTCondor jobs held due to exceeding their memory limit.
2. Count how many times each job had already been retried by checking a log file (after two retries, remove the job instead).
3. Triple the requested memory, up to a 512 GB cap.
4. Edit the held job's memory request in place and release it back into the queue.

It worked, and it saved countless user jobs over the years. Still, it had clear drawbacks:

- **Galaxy was blind to retries:** Because everything happened behind Galaxy's back in HTCondor, Galaxy had no idea a job had been resubmitted and could not record retry counts in job metrics.
- **Stale runtime memory hints:** Releasing the exact same HTCondor job in place raised the cluster's memory allocation, but memory hints baked into the job's environment still reflected the *original* allocation. A Java tool that ran out of heap space would simply hit the exact same limit again!
- **Polling delay and fragile state:** Held jobs waited up to 15 minutes for the next cron tick, and retry tracking relied on grepping a flat log file.

## The New HTCondor Runner – When Two Worlds Collide

The real catalyst for change arrived when we switched our main cluster destinations from Galaxy's legacy Condor runner to the newer native HTCondor runner (thanks to Bjorn!). Almost immediately, we hit a fundamental conflict.

When HTCondor puts a job on hold for exceeding memory, the new runner recognizes it as a memory limit failure, removes the held job from the HTCondor queue, and hands it off to Galaxy's failure handlers. In other words, Galaxy now treated memory holds as terminal for that Condor job and deleted it while our external cron script was trying to edit and release that exact same job!

The good news is that Galaxy already has a built-in resubmission handler designed for this exact situation, as long as the job's destination defines a resubmit policy. Instead of releasing a held Condor job in place, Galaxy terminates the old attempt, marks the job as resubmitted, waits a short delay, and sends it right back through TPV to submit a brand-new HTCondor job with freshly computed memory and environment settings.

## Moving Resubmission into TPV – Take One

In late August 2026, we opened [infrastructure-playbook#2278](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/2278) to switch our main Condor destinations to the native HTCondor runner, disable the old cron role, and wire up native TPV resubmission in our default tool configuration:

- **Retry policy:** Retry memory limit failures up to three times, routing the job back through TPV after a 60-second delay.
- **Persisting the multiplier:** Because Galaxy carries destination parameters across resubmissions, we stored a memory scaling factor there, doubling the multiplier on each retry up to a 512 GB ceiling.
- **Scaling memory:** A TPV rule checked whether a job was being resubmitted and scaled its memory allocation using the stored multiplier.

Of course, production had a few surprises ready for us right away. **Expressions are not numbers ([PR #2286](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/2286)):** On the very same day we merged the first PR, we discovered that a tool's default memory in TPV is still an unevaluated expression string (like `cores * 3.8`) when the rule runs, not a number. Multiplying a string in Python simply repeats the text and immediately crashes when compared against a numeric cap! **Making retries visible ([galaxy#23332](https://github.com/galaxyproject/galaxy/pull/23332), [PR #2405](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/2405)):** To actually see how often jobs were being resubmitted. This is very important to monitor galaxy resubmitions. Most of the times this means that tools have poorly allocated starting resources or the tools are enificient. A very imporant metric for ESG4Stars project with the goal of reducing the environmental impact of research infrastructure. 

**TL;DR:** Galaxy's native HTCondor runner removes memory-held jobs automatically, making external release scripts incompatible. We enabled native TPV resubmission by persisting a memory multiplier across retries, fixed expression-evaluation and dry-run quirks, and added resubmission counts to job metrics.

## The Rule Ordering Trap – Why Memory Wasn't Always Scaling

Everything looked calm until October 2026, when we inspected a few jobs that had failed after three OOM retries. Looking at the job details, the stored scaling factor had climbed all the way to 16×, yet the allocated memory had **never changed**!

The culprit was TPV's configuration merge and evaluation order. Galaxy loads our TPV files sequentially: defaults first, followed by the TPV Shared Database, destinations, local tool overrides, and user/role rules. Because our OOM scaling rule lived in the defaults file, it was evaluated **first**. Since TPV evaluates rules in order and the last rule setting memory wins, any tool-specific memory rule loaded later simply recomputed the memory from scratch and wiped out the OOM scaling!

The fix ([infrastructure-playbook#2446](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/2446)) was to move the entire resubmission setup into a [dedicated TPV resubmission file](https://github.com/usegalaxy-eu/infrastructure-playbook/blob/master/files/galaxy/tpv/resubmission.yml) loaded **last**, attaching the policy and scaling rules directly to our Condor destinations.

At the same time, we made the scaling logic itself much smarter: it evaluates the tool's base memory formula first (including complex multiline rules), applies the scaling factor while respecting both our 512 GB cap and any per-tool memory ceiling, and tells TPV to try another destination if the current one cannot accommodate the increased memory.

As a bonus, moving these rules onto destinations exposed a subtle upstream bug in TPV itself: destination rules initially saw the tool entity in their evaluation context instead of the destination until after a first rule matched. After a brief workaround, we fixed this properly upstream in [total-perspective-vortex#213](https://github.com/galaxyproject/total-perspective-vortex/pull/213) (released in TPV v3.3.1; see also [PR #2467](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/2467)).

**TL;DR:** Placing OOM scaling rules in the default TPV config meant they ran too early and were overwritten by tool-specific memory rules loaded later. Moving resubmission into a dedicated file loaded last—attached directly to our Condor destinations—ensured memory scaling always runs after every other rule, and even led to an upstream TPV v3.3.1 fix.

## The Disappearing Job Working Directory

Just when we thought we had squashed the last bug, another subtle interaction showed up two days later.

Galaxy Europe spreads disk I/O across a weighted pool of job working directories (JWDs), picking one randomly for each new job. Can you guess what happened when a job was resubmitted and routed through TPV a second time? TPV rolled the dice *again* and picked a different working directory! For one real job, HTCondor wrote its event log to the original working directory while Galaxy recorded the newly rolled directory. When the job hit its memory limit again, Galaxy looked in the wrong place, reported *"This job's HTCondor event log could not be found"*, and failed the job instead of triggering the next retry.

The fix ([infrastructure-playbook#2468](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/2468)) was straightforward: make working directory selection sticky across resubmissions—reusing the job's existing working directory whenever one is already assigned, and only drawing from the weighted pool for fresh jobs.

## Cleaning Up and What's Still Ahead

With TPV native resubmission running smoothly in production, we finally deleted the old HTCondor release role in our November cleanup ([infrastructure-playbook#2475](https://github.com/usegalaxy-eu/infrastructure-playbook/pull/2475)).

Of course, running a large Galaxy instance means there are always a few more edge cases to polish. One particularly interesting one we reported upstream in [galaxyproject/galaxy#24735](https://github.com/galaxyproject/galaxy/issues/24735) is handler-restart recovery: Galaxy persists a job's destination name, parameters, and external ID, but not the dynamically generated resubmit policy from TPV. If a Galaxy job handler restarts while a job is running, recovery looks up that destination only in Galaxy's static job configuration rather than TPV, silently dropping the retry policy for that in-flight job. We are working on a proper upstream fix for that rather than piling on another configuration workaround.

If you have made it this far, congratulations! Moving OOM resubmission into Galaxy and TPV took a few iterations, but having memory scaling, container environment variables, working directory stickiness, and job metrics all speaking the same language is well worth it. If you are setting up TPV resubmissions on your own Galaxy instance or have run into your own creative edge cases come chat with us [on Matrix](https://app.element.io/#/room/#galaxyproject_admins:gitter.im)!
