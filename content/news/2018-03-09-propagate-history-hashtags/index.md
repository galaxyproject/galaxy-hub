---
title: Propagating hashtags in a Galaxy history
date: '2018-03-09'
tags: [galaxy, tools, release]
repo: anuprulez/apply_history_tags
subsites: [eu, freiburg]
main_subsite: freiburg
---

We have written a utility to help you propagate tags through your histories. Did you forget to tag the inputs before running a long workflow? We've now solved this issue.

### Background

To process data using Galaxy, an raw dataset (HDA) is uploaded and few hashtags are added to make it better searchable and identifiable. Then, using different tools/workflows, this raw/input dataset is transformed into multiple new datasets. What if, after running dozens of tools, generating hundreds or thousands of datasets, you realise that you’ve forgotten to tag your input datasets? In this case, the new hashtags will not be propagated to the generated datasets automatically. We require an easy and automatic solution to assign correct hashtags to all of the downstream datasets generated from our inputs, whenever new hashtags are added to any of the datasets in our history. Before going into the further explanation, let’s assign the following labels to the types/names of datasets we would use:

- Input datasets as parent datasets
- Derived/generated datasets as child datasets

This [script](https://github.com/anuprulez/apply_history_tags) will solve the situations mentioned above, adding any new hashtags to all derived datasets. The script is written considering a Galaxy history as a tree (data structure) with input datasets as its roots and all the generated ones either as nodes or leaves of this tree. An example history ‘tree’ is shown in the figure below.

<p align="center">
  <img src="https://user-images.githubusercontent.com/3022518/37175617-5382eec8-231a-11e8-98b2-d5988dce3bb4.png">
</p>
                                                                       
In the above figure, we can see one input dataset with multiple datasets created from this input, using different tools (Galaxy tools). There can be any number of levels (tree hierarchy) in the ‘history’ tree from the top to bottom.

### How to use the script

In order to use the [script](https://github.com/anuprulez/apply_history_tags) to propagate hashtags from parents to children, a user should remember the hierarchy of their datasets. Wherever hashtags are added to datasets, they will be propagated to all the children of that dataset.  These new hashtags will be appended to the already existing hashtags for each child dataset. To use this script:

1. Acquire your API key from your Galaxy.
2. (Optionally) Get the ID of the history to apply hashtags to. If this id is not supplied, the script will use the most recently updated history.
3. Install [BioBlend](https://bioblend.readthedocs.io/en/latest/#installation) on your machine.
4. Execute: 
`python apply_tags.py <galaxy_url> <galaxy_api_key> <history_id optional>`

Here, <galaxy_url> is the URL of your Galaxy instance. <galaxy_api_key> is the Galaxy API key you obtained from your user preferences. <history_id> is the encoded id of a Galaxy history. It is an optional parameter.

### Example commands

Propagate hashtags in a specific history
```
python apply_tags.py "https://usegalaxy.org" "*******************" "f2db41e1fa331b3e"
```

Propagate hashtags in your most recently updated history
```
python apply_tags.py "https://usegalaxy.org" "*******************"
```

### A visual example

1. Upload a raw dataset using an upload tool and add a couple of hashtags (figure below the next point). Each arrow denotes the use of a Galaxy tool to transform one dataset into another.

2. Run a few tools (say ToolA and ToolB) using the input dataset and create new (child) datasets (figure below).
<p align="center">
  <img src="https://user-images.githubusercontent.com/3022518/37175698-99004f90-231a-11e8-8e4d-79109518cd10.png">
</p>

3. Now, add new hashtags to the input dataset. The figure below shows new hashtags (#new_root_tag1, #new_root_tag2) getting added to the input dataset.
<p align="center">
  <img src="https://user-images.githubusercontent.com/3022518/37175716-a531b600-231a-11e8-8088-a41cf46404f9.png">
</p>

4. To propagate the new hashtags from parent to child datasets, execute the script using the example commands (here one should use the id of the history created above containing 3 datasets). We can see the child datasets now contain the new hashtags from their parent (figure below).
<p align="center">
  <img src="https://user-images.githubusercontent.com/3022518/37175722-ab5794e6-231a-11e8-976b-2598eaadd9ce.png">
</p>

### More complex example

In the previous example, we saw a tree with one level of hierarchy. In the following visual, we would see a more complex example of inheriting hashtags from parents involving multiple levels in the history tree.(figure below).
<p align="center">
  <img src="https://user-images.githubusercontent.com/3022518/37175736-b52df492-231a-11e8-9524-542208135533.png">
</p>

### Propagate hashtags in Galaxy

<p align="center">
  <img src="https://user-images.githubusercontent.com/3022518/37175741-bb172a40-231a-11e8-835c-50166b6f11e3.png">
</p>                                                                   
1.fasta &rarr; 3:Replace Text on data 1 &rarr; 4: Text transformation on data 3

In the above figure, "1.fasta" is the root (input dataset). "3:Replace Text on data 1" is the child/derived dataset from the root. "4: Text transformation on data 3" is the child of the second dataset. The hashtags that we see are after executing the script on this history.


