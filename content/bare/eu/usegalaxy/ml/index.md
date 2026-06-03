---
title: Galaxy Machine Learning
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

# Welcome to the Galaxy for research in AI, statistics and prediction hub


<img src="/assets/media/usegalaxy/ml/grasp-logo.png" alt="Galaxy for research in AI, statistics and prediction" style="float:right; width: 20em; height: auto; margin: 0 0 1rem 1.5rem;" />

The Galaxy for research in AI, statistics and prediction is a hub of tools, workflows and training materials for dedicated machine learning tasks such as data preprocessing, classification, regression, clustering, fine-tuning biological foundation models and visualisation to achieve end-to-end varied machine learning analyses.
The complete set of resources are available on the [Galaxy platform](https://galaxyproject.org), which guarantees simple access, easy extension, flexible adaption to personal needs, accelerated model training, and sophisticated and reproducible machine learning analyses independent of command-line knowledge.

The hub provides you with a Swiss Army knife of [Scikit-learn](https://scikit-learn.org),
[Keras](https://keras.io) (a deep learning library based on [TensorFlow](https://www.tensorflow.org)), [PyTorch](https://pytorch.org/) and various other tools to transform, learn and predict and plot your data.

The hub is mainly developed by the [Goecks Lab](https://goeckslab.org) and the [European Galaxy project](https://galaxyproject.eu/). The [German Network for Bioinformatics Infrastructure (de.NBI)](http://www.denbi.de),
which runs the German [ELIXIR Node](https://www.elixir-europe.org/), provides the necessary compute clusters with CPUs and GPU resources.

The project is a community effort, please jump in, ask questions, contribute to the development of new tools, workflows or trainings and research and learn along the way!

# Content

- [Get started](#get-started)
- [Training](#training)
- [Available tools](#available-tools)
  - [Classification](#classification)
  - [Regression](#regression)
  - [Unsupervised/Clustering](#clustering)
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
Take [a guided tour](https://usegalaxy.eu/tours/core.galaxy_ui) through Galaxy's user interface.

# Training

We are passionate about training. So we are working in close collaboration with the
[Galaxy Training Network (GTN)](https://galaxyproject.org/learn/) to develop training materials of data analyses
based on Galaxy (Batut et al. 2017). These materials hosted on the GTN GitHub
repository are available online at [https://training.galaxyproject.org](https://training.galaxyproject.org).

Want to learn more about machine learning? Take one of our guided tours or check out the following hands-on tutorials, developed together with the [GTN "Statistics and machine learning" community](https://training.galaxyproject.org/training-material/topics/statistics/).

Lesson | Slides | Hands-on | Input dataset | Workflows
--- | --- | --- | --- | ---
Introduction to machine learning | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/machinelearning/slides.html#1) | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/machinelearning/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/1468039#.W8zyxBRoSAo) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/machinelearning/workflows/) |
Classification | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/machinelearning/slides.html#1) | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/classification_machinelearning/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/3738729#.XsjpbHUzY5k) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/classification_machinelearning/workflows/) |
Multi-omics classification (Flexynesis) | | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/flexynesis_classification/tutorial.html) | [<Icon name="files" />](https://zenodo.org/records/16287482) | [<Icon name="share-2" />](https://usegalaxy.eu/u/nilchia/h/gta2026-modeling-breast-cancer-subtypes-with-flexynesis) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/flexynesis_classification/workflows/) | 
Regression | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/machinelearning/slides.html#1) | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/regression_machinelearning/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/2579649#.XHep39F7mL4) | [<Icon name="share-2" />](https://ml.usegalaxy.eu/workflows/run?id=138d4893a1d6228e)  | | [<Icon name="list" />](https://ml.usegalaxy.eu/u/sbray/h/age-prediction-using-machine-learning---rnaseq) [<Icon name="list" />](https://ml.usegalaxy.eu/u/sbray/h/age-prediction-using-machine-learning---dna-methylation) |
Clustering |  | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/clustering_machinelearning/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/3813447#.Xsjsy3UzY5k) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/clustering_machinelearning/workflows/) |
Deep Learning (Part 1) - Feedforward neural networks (FNN) | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/FNN/slides.html) | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/FNN/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/4660497) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/FNN/workflows/)|
Deep Learning (Part 2) - Recurrent neural networks (RNN)| [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/RNN/slides.html) | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/RNN/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/4477881) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/RNN/workflows/)|
Deep Learning (Part 3) - Convolutional neural networks (CNN) | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/CNN/slides.html) | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/FNN/tutorial.html) | [<Icon name="files" />](https://zenodo.org/record/4697906) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/CNN/workflows/)|
GLEAM Image Learner - Validating Skin Lesion Classification | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/image_learner/slides.html) | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/image_learner/tutorial.html) | [<Icon name="files" />](https://zenodo.org/records/17114688) | [<Icon name="share-2" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/image_learner/workflows/)|
Fine tune biological foundation model (protein language models) | [<Icon name="presentation" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/fine_tuning_protTrans/slides.html) | [<Icon name="laptop" />](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/fine_tuning_protTrans/tutorial.html) | [<Icon name="files" />](https://zenodo.org/records/10986248) | |

# Available tools

In this section we list the most important tools that have been integrated into the machine learning hub.
There are many more tools available so please have a more detailed look at the tool panel.
For better readability, we have divided them into categories.

## Classification

Identifying which category an object belongs to.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fflexynesis%2Fflexynesis%2F1.1.10%2Bgalaxy0&version=latest" target="_top" title="flexynesis">flexynesis</a> | Flexynesis: deep learning tool for multi-omics data | [Uyar et al. 2025](https://doi.org/10.1038/s41467-025-63688-5)
<a href="https://ml.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Ftabpfn%2Ftabpfn%2F7.0.0%2Bgalaxy1&version=latest" target="_top" title="tabpfn">tabpfn</a> | Tabular data classification using TabPFN | [Hollmann et al. 2025](https://doi.org/10.1038/s41586-024-08328-6)
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
<a href="https://ml.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Ftabpfn%2Ftabpfn%2F7.0.0%2Bgalaxy1&version=latest" target="_top" title="tabpfn">tabpfn</a> | Tabular data regression using TabPFN | [Hollmann et al. 2025](https://doi.org/10.1038/s41586-024-08328-6)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_ensemble%2Fsklearn_ensemble" target="_top" title="sklearn_ensemble">sklearn_ensemble</a> | Ensemble methods for classification and regression | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_generalized_linear%2Fsklearn_generalized_linear" target="_top" title="sklearn_generalized_linear">sklearn_generalized_linear</a> | Generalized linear models for classification and regression | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_regression_metrics%2Fsklearn_regression_metrics" target="_top" title="sklearn_regression_metrics">sklearn_regression_metrics</a> | Calculate metrics for regression performance | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Unsupervised/Clustering

Automatic grouping of similar objects into sets.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fflexynesis%2Fflexynesis%2F1.1.10%2Bgalaxy0&version=latest" target="_top" title="flexynesis">flexynesis</a> | Flexynesis: deep learning tool for multi-omics data | [Uyar et al. 2025](https://doi.org/10.1038/s41467-025-63688-5)
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
<a href="https://ml.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fcleanlab%2Fcleanlab_issue_handler%2F2.7.1%2Bgalaxy1.0&version=latest" target="_top" title="cleanlab">cleanlab</a> | Detect and optionally clean data issues using Cleanlab | [Northcutt et al. 2021](https://arxiv.org/pdf/1911.00068)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_data_preprocess%2Fsklearn_data_preprocess" target="_top" title="sklearn_data_preprocess">sklearn_data_preprocess</a> | Preprocess raw feature vectors into standardized datasets  | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
<a href="https://ml.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fsklearn_feature_selection%2Fsklearn_feature_selection" target="_top" title="sklearn_feature_selection">sklearn_feature_selection</a> | Feature Selection module, including univariate filter selection methods and recursive feature elimination algorithm | [Pedregosa et al. 2011](http://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Deep learning

Build and use deep neural networks.

Tool | Description | Reference
--- | --- | ---
<a href="https://ml.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fgoeckslab%2Fimage_learner%2Fimage_learner%2F0.1.5&version=latest" target="_top" title="image_learner">image_learner</a> | Image Learner: image classification | [Khai Van Dang et al. 2026](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/image_learner/tutorial.html)
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
[GPU-enabled Jupyter Lab](https://usegalaxy.eu/?tool_id=interactive_tool_ml_jupyter_notebook&version=latest) | GPU-enabled Jupyter Lab | 
[Jupyter](https://live.usegalaxy.eu/?tool_id=interactive_tool_jupyter_notebook) | Jupyter lab | 
[RStudio](https://live.usegalaxy.eu/?tool_id=interactive_tool_rstudio_notebook) | RStudio | 



# Contributors

- [Qiang Gu](https://github.com/qiagu)
- [Jeremy Goecks](https://github.com/jgoecks)
- [Amirhossein Naghsh Nilchi](https://github.com/nilchia)
- [Anup Kumar](https://github.com/anuprulez)
- [Bjoern Gruening](https://github.com/bgruening)
- [Alireza Khanteymoori](https://github.com/khanteymoori)
- [Simon Bray](https://github.com/simonbray)
- [Vahid Jalili](https://github.com/VJalili)

<slot name="/eu/common/data-policy" />

<slot name="/bare/eu/usegalaxy/jobs" />
