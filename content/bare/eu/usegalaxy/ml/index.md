---
title: Galaxy Machine Learning
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

# Welcome to the Galaxy Machine Learning workbench


<img src="/assets/media/usegalaxy/ml/machine_learning_logo.png" alt="ML Galaxy" style="float: right; width: min(35vw, 15rem); height: auto; margin: 0 0 1rem 1.5rem;" />

The Galaxy Machine Learning workbench is a comprehensive set of data preprocessing, machine learning, deep learning and visualisation tools, consolidated workflows for end-to-end machine learning analysis and training materials to showcase the usage of these tools.
The workbench is available on the [Galaxy framework](https://galaxyproject.org), which guarantees simple access, easy extension, flexible adaption to personal and security needs, and sophisticated machine learning analyses independent of command-line knowledge.

The workbench provides you with a Swiss Army knife of [scikit-learn](https://scikit-learn.org),
[Keras](https://keras.io) (a deep learning library based on [TensorFlow](https://www.tensorflow.org)) and various other tools to transform, learn and predict and plot your data.

The workbench is currently developed by the [Goecks Lab](https://goeckslab.org) and the [European Galaxy project](https://galaxyproject.eu/).
The [German Network for Bioinformatics Infrastructure (de.NBI)](http://www.denbi.de),
which runs the German [ELIXIR Node](https://www.elixir-europe.org/), provides the necessary compute clusters with CPUs and GPU resources.

The project is a community effort, please jump in, ask questions, and contribute to the development of new tools, workflows or trainings!

# Content

- [Get started](#get-started)
- [Training](#training)
- [Available tools](#available-tools)
  - [Classification](#classification)
  - [Regression](#regression)
  - [Clustering](#clustering)
  - [Model building](#model-building)
  - [Model evaluation](#model-evaluation)
  - [Preprocessing and feature selection](#preprocessing-and-feature-selection)
  - [Deep learning](#deep-learning)
  - [Visualization](#visualization)
  - [Utilities](#utilities)
  - [Interactive Environments](#interactive-environments)
- [Contributors](#contributors)

# Get started

Are you new to Galaxy, or returning after a long time, and looking for help to get started?
Take [a guided tour](https://ml.usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

# Training

We are passionate about training. So we are working in close collaboration with the
[Galaxy Training Network (GTN)](https://galaxyproject.org/teach/gtn/) to develop training materials of data analyses
based on Galaxy (Batut et al. 2017). These materials hosted on the GTN GitHub
repository are available online at [https://training.galaxyproject.org](https://training.galaxyproject.org).

Want to learn more about machine learning? Take one of our guided tours or check out the following hands-on tutorials, developed together with the [GTN community](https://galaxyproject.org/teach/gtn/).

Lesson | Slides | Hands-on | Input dataset | Workflows | Galaxy tour | Galaxy History
--- | --- | --- | --- | --- | --- | ---
Basics of machine learning |  | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/machinelearning/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/1468039#.W8zyxBRoSAo) | [<Icon name="share-2" />](https://ml.usegalaxy.eu/workflows/run?id=17e99647745eb150) | [<Icon name="wand-2" />](https://github.com/galaxyproject/training-material/tree/master/topics/statistics/tutorials/machinelearning/tours/) | [<Icon name="list" />](https://ml.usegalaxy.eu/u/sbray/h/basics-of-machine-learning) |
Classification |  | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/classification_machinelearning/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/3738729#.XsjpbHUzY5k) | [<Icon name="share-2" />](https://ml.usegalaxy.eu/workflows/run?id=1d55d5d20c581b16) | | |
Regression |  | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/regression_machinelearning/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/2579649#.XHep39F7mL4) | [<Icon name="share-2" />](https://ml.usegalaxy.eu/workflows/run?id=138d4893a1d6228e)  | | |
Age prediction using machine learning |  | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/age-prediction-with-ml/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/2545213#.XEWTJ9-YVa0) | [<Icon name="share-2" />](https://ml.usegalaxy.eu/workflows/run?id=83fe480cdbb70099) [<Icon name="share-2" />](https://ml.usegalaxy.eu/workflows/run?id=a669986e1a5cee31) |  | [<Icon name="list" />](https://ml.usegalaxy.eu/u/sbray/h/age-prediction-using-machine-learning---rnaseq) [<Icon name="list" />](https://ml.usegalaxy.eu/u/sbray/h/age-prediction-using-machine-learning---dna-methylation) |
Clustering |  | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/clustering_machinelearning/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/3813447#.Xsjsy3UzY5k) | [<Icon name="share-2" />](https://ml.usegalaxy.eu/workflows/run?id=848389c45cebe34f) | | |
Introduction to deep learning |  | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/intro_deep_learning/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/3706539#.XsjteHUzY5l) | | | |



# Available tools

In this section we list the most important tools that have been integrated into the Machine Learning workbench.
There are many more tools available so please have a more detailed look at the tool panel.
For better readability, we have divided them into categories.

## Classification

Identifying which category an object belongs to.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_svm_classifier%2Fsklearn_svm_classifier" target="_top" title="sklearn_svm_classifier">sklearn_svm_classifier</a> | Support vector machines (SVMs) for classification| [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_nn_classifier%2Fsklearn_nn_classifier" target="_top" title="sklearn_nn_classifier">sklearn_nn_classifier</a> | Nearest Neighbors Classification | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_ensemble%2Fsklearn_ensemble" target="_top" title="sklearn_ensemble">sklearn_ensemble</a> | Ensemble methods for classification and regression | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_discriminant_classifier%2Fsklearn_discriminant_classifier" target="_top" title="sklearn_discriminant_classifier">sklearn_discriminant_classifier</a> | Linear and Quadratic Discriminant Analysis| [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_generalized_linear%2Fsklearn_generalized_linear" target="_top" title="sklearn_generalized_linear">sklearn_generalized_linear</a> | Generalized linear models for classification and regression | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_clf_metrics%2Fsklearn_clf_metrics" target="_top" title="sklearn_clf_metrics">sklearn_clf_metrics</a> | Calculate metrics for classification performance  | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Regression

Predicting a continuous-valued attribute associated with an object.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_ensemble%2Fsklearn_ensemble" target="_top" title="sklearn_ensemble">sklearn_ensemble</a> | Ensemble methods for classification and regression | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_generalized_linear%2Fsklearn_generalized_linear" target="_top" title="sklearn_generalized_linear">sklearn_generalized_linear</a> | Generalized linear models for classification and regression | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_regression_metrics%2Fsklearn_regression_metrics" target="_top" title="sklearn_regression_metrics">sklearn_regression_metrics</a> | Calculate metrics for regression performance | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Clustering

Automatic grouping of similar objects into sets.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_numeric_clustering%2Fsklearn_numeric_clustering" target="_top" title="sklearn_numeric_clustering">sklearn_numeric_clustering</a> | Different numerical clustering algorithms | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Model building

Building general machine learning models.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_estimator_attributes%2Fsklearn_estimator_attributes" target="_top" title="sklearn_estimator_attributes">sklearn_estimator_attributes</a> | Estimator attributes to get all attributes from an estimator or scikit object | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_stacking_ensemble_models%2Fsklearn_stacking_ensemble_models" target="_top" title="sklearn_stacking_ensemble_models">sklearn_stacking_ensemble_models</a> | Stacking Ensembles to build stacking, voting ensemble models with numerous base options | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_searchcv%2Fsklearn_searchcv" target="_top" title="sklearn_searchcv">sklearn_searchcv</a> | Hyperparameter Search performs hyperparameter optimization using various SearchCVs  | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_build_pipeline%2Fsklearn_build_pipeline" target="_top" title="sklearn_build_pipeline">sklearn_build_pipeline</a> | Pipeline Builder as an all-in-one platform to build pipeline, single estimator, preprocessor and custom wrappers | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Model evaluation

Evaluation, validating and choosing parameters and models.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_model_validation%2Fsklearn_model_validation" target="_top" title="sklearn_model_validation">sklearn_model_validation</a> | Model Validation includes cross_validate, cross_val_predict, learning_curve, and more | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_pairwise_metrics%2Fsklearn_pairwise_metrics" target="_top" title="sklearn_pairwise_metrics">sklearn_pairwise_metrics</a> | Evaluate pairwise distances or compute affinity or kernel for sets of samples | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_train_test_eval%2Fsklearn_train_test_eval" target="_top" title="sklearn_train_test_eval">sklearn_train_test_eval</a> | Train, Test and Evaluation to fit a model using part of dataset and evaluate using the rest | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fmodel_prediction%2Fmodel_prediction" target="_top" title="model_prediction">model_prediction</a> | Model Prediction predicts on new data using a preffited model | [Chollet et al. 2011](https://keras.io)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_fitted_model_eval%2Fsklearn_fitted_model_eval" target="_top" title="sklearn_fitted_model_eval">sklearn_fitted_model_eval</a> | Evaluate a Fitted Model using a new batch of labeled data | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_model_fit%2Fsklearn_model_fit" target="_top" title="sklearn_model_fit">sklearn_model_fit</a> | Fit a Pipeline, Ensemble or other models using a labeled dataset | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)



## Preprocessing and feature selection

Feature selection and preprocessing.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_data_preprocess%2Fsklearn_data_preprocess" target="_top" title="sklearn_data_preprocess">sklearn_data_preprocess</a> | Preprocess raw feature vectors into standardized datasets  | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_feature_selection%2Fsklearn_feature_selection" target="_top" title="sklearn_feature_selection">sklearn_feature_selection</a> | Feature Selection module, including univariate filter selection methods and recursive feature elimination algorithm | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Deep learning

Build and use deep neural networks.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fkeras_batch_models%2Fkeras_batch_models" target="_top" title="keras_batch_models">keras_batch_models</a> | Build Deep learning Batch Training Models with online data generator for Genomic/Protein sequences and images | [Chollet et al. 2011](https://keras.io)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fkeras_model_builder%2Fkeras_model_builder" target="_top" title="keras_model_builder">keras_model_builder</a> | Create deep learning model with an optimizer, loss function and fit parameters | [Chollet et al. 2011](https://keras.io)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fkeras_model_config%2Fkeras_model_config" target="_top" title="keras_model_config">keras_model_config</a> | Create a deep learning model architecture using Keras | [Chollet et al. 2011](https://keras.io)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fkeras_train_and_eval%2Fkeras_train_and_eval" target="_top" title="keras_train_and_eval">keras_train_and_eval</a> | Deep learning training and evaluation either implicitly or explicitly  | [Chollet et al. 2011](https://keras.io)


## Visualization

Plotting and visualization.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fplotly_regression_performance_plots%2Fplotly_regression_performance_plots" target="_top" title="plotly_regression_performance_plots">plotly_regression_performance_plots</a> | Plot actual vs predicted curves and residual plots of tabular data |
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fplotly_ml_performance_plots%2Fplotly_ml_performance_plots" target="_top" title="plotly_ml_performance_plots">plotly_ml_performance_plots</a> | Plot confusion matrix, precision, recall and ROC and AUC curves of tabular data |
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fml_visualization_ex%2Fml_visualization_ex" target="_top" title="ml_visualization_ex">ml_visualization_ex</a> | Machine Learning Visualization Extension includes several types of plotting for machine learning | [Chollet et al. 2011](https://keras.io)


## Utilities

General data and table manipulation tools.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Ftable_compute%2Ftable_compute" target="_top" title="table_compute">table_compute</a> | The power of the pandas data library for manipulating and computing expressions upon tabular data and matrices. |
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fdatamash_ops%2Fdatamash_ops" target="_top" title="datamash_ops">datamash_ops</a> | Datamash operations on tabular data |
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fiuc%2Fdatamash_transpose%2Fdatamash_transpose" target="_top" title="datamash_transpose">datamash_transpose</a> | Transpose rows/columns in a tabular file |
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_sample_generator%2Fsklearn_sample_generator" target="_top" title="sklearn_sample_generator">sklearn_sample_generator</a> | Generate random samples with controlled size and complexity | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_train_test_split%2Fsklearn_train_test_split" target="_top" title="sklearn_train_test_split">sklearn_train_test_split</a> | Split Dataset into training and test subsets | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Interactive Environments

You have done the heavy lifting and now want to use your coding skills inside Jupyter or RStudio? Work on data with the following:

Tool | Description | Reference
--- | --- | ---
[Jupyter](https://live.usegalaxy.eu/?tool_id=interactive_tool_jupyter_notebook) | Jupyter lab | 
[RStudio](https://live.usegalaxy.eu/?tool_id=interactive_tool_rstudio_notebook) | RStudio | 



# Contributors

- [Qiang Gu](https://github.com/qiagu)
- [Jeremy Goecks](https://github.com/jgoecks)
- [Anup Kumar](https://github.com/anuprulez)
- [Bjoern Gruening](https://github.com/bgruening)
- [Alireza Khanteymoori](https://github.com/khanteymoori)
- [Simon Bray](https://github.com/simonbray)
- [Vahid Jalili](https://github.com/VJalili)

<slot name="/eu/common/data-policy" />

<slot name="/bare/eu/usegalaxy/jobs" />
