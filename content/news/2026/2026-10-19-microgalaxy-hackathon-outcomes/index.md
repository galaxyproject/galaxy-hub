---
title: "One Day, Many Tool Updates: microGalaxy Hackathon Recap"
date: '2026-10-19'
tease: "Eight contributors, one day, and a pile of outdated metagenomics tools — here is what the October 14th microGalaxy hackathon achieved!"
hide_tease: false
tags:
- hackathon
- microgalaxy
- microbiology
- metagenomics
- tools
subsites: [all-eu, global, eu, all]
main_subsite: eu
contributions:
  authorship:
    - paulzierep
  funding:
    - elixir-europe
    - deNBI
    - mwk
    - ifb
organizers:
  - paulzierep
---

On October 14th, we ran the [microGalaxy hackathon](/events/2026-10-14-microgalaxy-hackathon/) we announced a few weeks ago — and it worked out even better than hoped! Eight of us from the [microGalaxy community](https://galaxyproject.org/community/sig/microbial/) blocked a day, picked a tool from our [outdated-tools list](https://github.com/galaxyproject/tools-iuc/issues/8301), and got to work. The format is simple but effective: no talks, no slides — just everyone updating the tools that our users rely on every day.

## Already merged

Right around the hackathon, these updates landed in the IUC repository:

- [MEGAN](https://github.com/galaxyproject/tools-iuc/pull/8530) (6.21.7 → 6.25.10), updated and reviewed by Saim
- [Tasmanian Mismatch](https://github.com/galaxyproject/tools-iuc/pull/8534) (→ 2.1.0), also by Saim
- [StrainDesign](https://github.com/galaxyproject/tools-iuc/pull/8535) (→ 3.2.3), updated by Povilas
- [dRep](https://github.com/galaxyproject/tools-iuc/pull/8487) (3.7.1 → 4.0.2) and [mmseqs2](https://github.com/galaxyproject/tools-iuc/pull/8481) (→ 18), merged just in time

## Still in flight — reviews welcome!

Several updates are finished or nearly finished and waiting for a review. If you want to help, these are easy wins:

- [Bakta](https://github.com/galaxyproject/tools-iuc/pull/8358) (1.9.4 → 1.12.1)
- [PICRUSt2](https://github.com/galaxyproject/tools-iuc/pull/8404) (→ 2.6.3) and [DISCO](https://github.com/galaxyproject/tools-iuc/pull/8395) (→ 1.3), both by Saim
- [prokka](https://github.com/galaxyproject/tools-iuc/pull/7542) — Povilas even pushed [a fix upstream to prokka itself](https://github.com/tseemann/prokka/pull/736) and prepared the [wrapper test update](https://github.com/galaxyproject/tools-iuc/pull/8532) for it
- [savont](https://github.com/galaxyproject/tools-iuc/pull/8497), a new tool by Matthias
- GTDB-Tk and argNorm, taken on by Hugo
- [PhyloPhlAn](https://github.com/galaxyproject/tools-iuc/pull/7067), carefully reviewed by Mina

Beyond plain version bumps, Berenice started updating antiSMASH to v8, and we put the tool dev bot to the test on SemiBin — automating the boring parts of wrapper maintenance is exactly the kind of thing a hackathon day should explore.

## Some numbers

We also dug into who actually still uses the older amplicon tools: over the last five years, mothur was run ~870,000 times and DADA2 ~550,000 times on the main servers. So the answer to "is mothur still needed?" is a clear yes — old tools stay relevant as long as published workflows depend on them, which is exactly why keeping them maintained (and reproducible) matters.

## Thank you!

Thanks to everyone who joined — Saim, Povilas, Matthias, Berenice, Hugo, Mina, Rand, and everyone who jumped in for reviews and discussions. The full list of tools still needing updates lives in [IUC issue #8301](https://github.com/galaxyproject/tools-iuc/issues/8301), and we coordinate on the [microGalaxy Matrix channel](https://matrix.to/#/#galaxyproject_microGalaxy:gitter.im). Tool wrapping experience is helpful but not required — there are tasks for all levels, so join us next time!
