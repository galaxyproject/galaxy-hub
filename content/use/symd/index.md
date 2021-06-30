---
title: "SymD"
url: "http://symd.nci.nih.gov/"
scope: "domain"
platforms:
  - platform_group: "public-server"
    platform_url: "http://symd.nci.nih.gov/"
    platform_text: "SymD Galaxy Server"
    platform_location: US
summary: "a platform for detecting internally symmetric protein structures"
image: "/src/use/symd/symd.png"
comments:
  - "SymD works through an *alignment scan* procedure in which a protein structure is aligned to itself after circularly permuting the second copy by all possible number of residues."
  - "Input to SymD is a PDB format coordinate file. SymD reports T‐score, Zscore, transformed structure at the position of the best Z‐score, as well as the symmetry axis, the rotation angle and any translation along the symmetry axis (for helical symmetry)."
user_support:
  - "[Instructions](http://symd.nci.nih.gov/static/Interface_help/Interface_help.html)"
  - "[Example Run](http://symd.nci.nih.gov/static/example_run/GalaxySymD.html)"
  - "Email support <taic@mail.nih.gov>"
quotas:
citations:
  - "[SymD webserver: a platform for detecting internally symmetric protein structures](https://doi.org/10.1093/nar/gku364), by Chin-Hsien Tai, Rohit Paul, Jeffery D. Shilling and Byungkook Lee, *Nucleic Acids Research* (2014) doi: 10.1093/nar/gku364"
pub_libraries:
  - "SymD"
sponsors:
  - "[US National Cancer Institute (NCI)](http://nci.nih.gov/)"
---
