---
title: 'Tool Quest: Do you know the answer?'
date: '2019-02-09'
tags: [training]
location:
  name: Galaxy Europe
supporters:
- denbi
- bmbf
authors: bgruening
authors_structured:
- github: bgruening
subsites: [eu, freiburg]
main_subsite: freiburg
---

Last week we got a request from on of our users with a tricky question:

> I need a tool that:
> - reads two files (`parent`, and `subset`)
> - I need to pick out random lines from the `parent`
>    - but it should ignore lines in the `subset`.
> And the number of random lines to be picked should be equal to the number of lines in the subset file.
>
> Two example files are attached:
>
> `Parent`:
>
> ```
> abcd
> bcde
> cdef
> defg
> efgh
> fghi
> ghij
> hijk
> ijkl
> jklm
> klmn
> lmno
> mnop
> nopq
> opqr
> pqrs
> qrst
> rstu
> stuv
> tuvw
> uvwx
> vwxy
> wxyz
> ```
>
> And `subset` (is a subset of the parent file):
>
> ```
> hijk
> ijkl
> jklm
> opqr
> pqrs
> qrst
> ```

Any idea how to solve that? It is possible with the normal Galaxy tools :)

---

We proposed the following solution:

  1. ["Join two files"](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/text_processing/tp_easyjoin_tool/)
  to filter out the lines that are in the `subset` file __and__ the `parent` file. You should have now a new `parent` file without those line from the `subset`.

  2. ["Sort"](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/text_processing/tp_sort_header_tool/)
  the new file with the option `Random order (-R)`. Sort has indeed a random sorting option, somehow unintuitive - but useful.<br>
  Now we have a random sorted file without the unwanted lines. What needs to be done is to extract N lines, where N is the length of the `subset` file.

  3. ["Add column to an existing dataset"](https://usegalaxy.eu/root?tool_id=addValue) with the `iterate` option enabled. This you need to do
  for both files the initial `subset` file and the new random sorted partent from step 2.

  4. Now use ["Join two files"](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/text_processing/tp_easyjoin_tool/)
  again, but this time on the newly created datasets with the additional column. This will give you exactly N lines where N is the amount of
  lines in the `subset` file.

  5. (Optional) If needed, remove the additional column with the [Cut tool](https://usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/bgruening/text_processing/tp_cut_tool/1.1.0).

