---
date: '2017-10-10'
title: "SciPy and scikit-learn integration into Galaxy"
tease: ""
authors: "Björn Grüning"
image: /src/blog/2017-10-10-scipy-galaxy/sci-py-kit-learn.png
---

[Numpy](http://www.numpy.org), [SciPy](https://www.scipy.org), [scikit-learn](http://scikit-learn.org),
[pandas](http://pandas.pydata.org/) - indeed the entire scientific Python stack - provides an awesome foundation for modern
scientific computing. With Jupyter now an [integral part of Galaxy](https://doi.org/10.1371%2Fjournal.pcbi.1005425) 
its time to integrate all the powerful scientific Python libraries into Galaxy.

Integrating all different modules of scipy or scikit-learn into Galaxy as tools seems to be a laborious task.
In the classical Galaxy way, we would need to have some kind of wrapper script, that needs to accept hundreds of
parameters and call the correct scipy function. We would need to create the user interface (UI), and make this really useable
and with a rock solid user experience (UX). The developer would have at least 2 places to update the code and given the
huge turnaround of the scientific Python stack, this is not an easy task.

Here we present an easy way how we can solve these issues and integrate the scientific Python stack with a first class UX,
keeping the maintenance burden as low as possible.

For this we will rely on two features:

 * scipy unified API
 * [`<configfiles>`](https://docs.galaxyproject.org/en/latest/dev/schema.html#tool-configfiles)


The scipy API is great, and for example allows us to use all cluster algorithms in a very similar way. Consider the following
code.

```python
my_class = getattr(sklearn.cluster, 'insert_algorithm_name_here')
cluster_object = my_class()
options = dict() # with your options
cluster_object.set_params(**options)
```

Given this small snippet, we can create something like this for Galaxy.

```python
selected_algorithm = params["input_types"]["algorithm_options"]["selected_algorithm"]
my_class = getattr(sklearn.cluster, selected_algorithm)
cluster_object = my_class()
options = params["input_types"]["algorithm_options"]["options"]
cluster_object.set_params(**options)
```

We can use Galaxy's `configfile` feature to create script on the fly and add a UI like the following.

```xml
<param name="selected_algorithm" type="select" label="Clustering Algorithm">
    <option value="AgglomerativeClustering">Hierarchical Agglomerative Clustering</option>
    <option value="AffinityPropagation">Affinity Propagation</option>
    <option value="SpectralClustering">Spectral Clustering</option>
    <option value="MiniBatchKMeans">Mini Batch KMeans</option>
    <option value="KMeans">KMeans</option>
    <option value="DBSCAN">DBSCAN</option>
    <option value="Birch">Birch</option>
</param>
```

Now we have a few lines of general Python code, a few lines of specific code for the UI/UX and we are done. Just
add `<option value="MeanShift">MeanShift</option>` to the UX code and your Galaxy tool will have a new clustering method.

You can now *build a user interface and the Python code is "written" automatically* for you. Add functionality to the
user interface and the general Python code will take care of it.

Have a look at our first [clustering tool](https://github.com/bgruening/galaxytools/blob/master/tools/sklearn/numeric_clustering.xml)
or many other tools under https://github.com/bgruening/galaxytools/blob/master/tools/sklearn/.



