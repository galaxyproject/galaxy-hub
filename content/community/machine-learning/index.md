---
title: Galaxy Machine Learning Community
---

<a href="https://ml.usegalaxy.eu"><div class='center'><img src="/src/images/communities/machine_learning_logo.png" /></div></a>


The Galaxy Machine Learning workbench is a comprehensive set of data preprocessing, machine learning, deep learning and visualisation tools, consolidated workflows for end-to-end machine learning analysis and training materials to showcase the usage of these tools.
The workbench is available on the [Galaxy framework](https://galaxyproject.org), which guarantees simple access, easy extension, flexible adaption to personal and security needs, and sophisticated machine learning analyses independent of command-line knowledge.

The workbench provides you with a Swiss Army knife of [scikit-learn](https://scikit-learn.org),
[Keras](https://keras.io) (a deep learning library based on [TensorFlow](https://www.tensorflow.org)) and various other tools to transform, learn and predict and plot your data.

The workbench is currently developed by the [Goecks Lab](https://goeckslab.org) and the [European Galaxy project](https://galaxyproject.eu/).
The [German Network for Bioinformatics Infrastructure (de.NBI)](https://www.denbi.de),
which runs the German [ELIXIR Node](https://www.elixir-europe.org/), provides the necessary compute clusters with CPUs and GPU resources.

The project is a community effort, please jump in, ask questions, and contribute to the development of new tools, workflows or trainings!

# Training

We are passionate about training. So we are working in close collaboration with the
[Galaxy Training Network (GTN)](https://training.galaxyproject.org/) to develop training materials of data analyses
based on Galaxy. These materials hosted on the GTN GitHub
repository are available online at [https://training.galaxyproject.org](https://training.galaxyproject.org).

Want to learn more about machine learning? Take one of our guided tours or check out the following hands-on tutorials, developed together with the [GTN community](https://training.galaxyproject.org/).

Lesson | Slides | Hands-on | Input dataset | Workflows | Galaxy tour | Galaxy History
| --- | --- | --- | --- | --- | --- | --- |
Basics of machine learning |  | [<i class="fa fa-laptop" aria-hidden="true"></i>](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/machinelearning/tutorial.html) | [<i class="fa fa-file" aria-hidden="true"></i>](https://zenodo.org/record/1468039#.W8zyxBRoSAo) | [<i class="fa fa-share-alt" aria-hidden="true"></i>](https://ml.usegalaxy.eu//workflows/run?id=17e99647745eb150) | [<i class="fa fa-magic" aria-hidden="true"></i>](https://github.com/galaxyproject/training-material/tree/master/topics/statistics/tutorials/machinelearning/tours/) | [<i class="fa fa-list-ul" aria-hidden="true"></i>](https://ml.usegalaxy.eu//u/sbray/h/basics-of-machine-learning) |
Classification |  | [<i class="fa fa-laptop" aria-hidden="true"></i>](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/classification_machinelearning/tutorial.html) | [<i class="fa fa-file" aria-hidden="true"></i>](https://zenodo.org/record/3738729#.XsjpbHUzY5k) | [<i class="fa fa-share-alt" aria-hidden="true"></i>](https://ml.usegalaxy.eu//workflows/run?id=1d55d5d20c581b16) | | |
Regression |  | [<i class="fa fa-laptop" aria-hidden="true"></i>](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/regression_machinelearning/tutorial.html) | [<i class="fa fa-file" aria-hidden="true"></i>](https://zenodo.org/record/2579649#.XHep39F7mL4) | [<i class="fa fa-share-alt" aria-hidden="true"></i>](https://ml.usegalaxy.eu//workflows/run?id=138d4893a1d6228e)  | | |
Age prediction using machine learning |  | [<i class="fa fa-laptop" aria-hidden="true"></i>](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/age-prediction-with-ml/tutorial.html) | [<i class="fa fa-file" aria-hidden="true"></i>](https://zenodo.org/record/2545213#.XEWTJ9-YVa0) | [<i class="fa fa-share-alt" aria-hidden="true"></i>](https://ml.usegalaxy.eu//workflows/run?id=83fe480cdbb70099) [<i class="fa fa-share-alt" aria-hidden="true"></i>](https://ml.usegalaxy.eu//workflows/run?id=a669986e1a5cee31) |  | [<i class="fa fa-list-ul" aria-hidden="true"></i>](https://ml.usegalaxy.eu//u/sbray/h/age-prediction-using-machine-learning---rnaseq) [<i class="fa fa-list-ul" aria-hidden="true"></i>](https://ml.usegalaxy.eu//u/sbray/h/age-prediction-using-machine-learning---dna-methylation) |
Clustering |  | [<i class="fa fa-laptop" aria-hidden="true"></i>](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/clustering_machinelearning/tutorial.html) | [<i class="fa fa-file" aria-hidden="true"></i>](https://zenodo.org/record/3813447#.Xsjsy3UzY5k) | [<i class="fa fa-share-alt" aria-hidden="true"></i>](https://ml.usegalaxy.eu//workflows/run?id=848389c45cebe34f) | | |
Introduction to deep learning |  | [<i class="fa fa-laptop" aria-hidden="true"></i>](https://training.galaxyproject.org/training-material/topics/statistics/tutorials/intro_deep_learning/tutorial.html) | [<i class="fa fa-file" aria-hidden="true"></i>](https://zenodo.org/record/3706539#.XsjteHUzY5l) | | | |


# Available tools

In this section we list the most important tools that have been integrated into the Machine Learning workbench.
There are many more tools available so please have a more detailed look at the tool panel at [https://ml.usegalaxy.eu](https://ml.usegalaxy.eu).
All tools follow the [IUC best practise guidelines](https://galaxy-iuc-standards.readthedocs.io/) for Galaxy tool development and are available
under [https://github.com/bgruening/galaxytools](https://github.com/bgruening/galaxytools) and [https://github.com/goeckslab/Galaxy-ML](https://github.com/goeckslab/Galaxy-ML).
For better readability, we have listed the most powerful tools below and divided them into categories.

## Classification

Identifying which category an object belongs to.

Tool | Description | Reference
| --- | --- | --- |
[SVM Classifier](https://ml.usegalaxy.eu/root?tool_id=sklearn_svm_classifier) | Support vector machines (SVMs) for classification| [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[NN Classifier](https://ml.usegalaxy.eu/root?tool_id=sklearn_nn_classifier) | Nearest Neighbors Classification | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Ensemble classification](https://ml.usegalaxy.eu/root?tool_id=sklearn_ensemble) | Ensemble methods for classification and regression | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Discriminant Classifier](https://ml.usegalaxy.eu/root?tool_id=sklearn_discriminant_classifier) | Linear and Quadratic Discriminant Analysis| [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Generalized linear](https://ml.usegalaxy.eu/root?tool_id=sklearn_generalized_linear) | Generalized linear models for classification and regression | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[CLF Metrics](https://ml.usegalaxy.eu/root?tool_id=sklearn_clf_metrics) | Calculate metrics for classification performance  | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Regression

Predicting a continuous-valued attribute associated with an object.

Tool | Description | Reference
| --- | --- | --- |
[Ensemble regression](https://ml.usegalaxy.eu/root?tool_id=sklearn_ensemble) | Ensemble methods for classification and regression | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Generalized linear](https://ml.usegalaxy.eu/root?tool_id=sklearn_generalized_linear) | Generalized linear models for classification and regression | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Regression metrics](https://ml.usegalaxy.eu/root?tool_id=sklearn_regression_metrics) | Calculate metrics for regression performance | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Clustering

Automatic grouping of similar objects into sets.

Tool | Description | Reference
| --- | --- | --- |
[Numeric clustering](https://ml.usegalaxy.eu/root?tool_id=sklearn_numeric_clustering) | Different numerical clustering algorithms | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Model building

Building general machine learning models.

Tool | Description | Reference
| --- | --- | --- |
[Estimator Attributes](https://ml.usegalaxy.eu/root?tool_id=sklearn_estimator_attributes) | Estimator attributes to get all attributes from an estimator or scikit object | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Stacking Ensemble Models](https://ml.usegalaxy.eu/root?tool_id=sklearn_stacking_ensemble_models) | Stacking Ensembles to build stacking, voting ensemble models with numerous base options | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Search CV](https://ml.usegalaxy.eu/root?tool_id=sklearn_searchcv) | Hyperparameter Search performs hyperparameter optimization using various SearchCVs  | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Build Pipeline](https://ml.usegalaxy.eu/root?tool_id=sklearn_build_pipeline) | Pipeline Builder as an all-in-one platform to build pipeline, single estimator, preprocessor and custom wrappers | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Model evaluation

Evaluation, validating and choosing parameters and models.

Tool | Description | Reference
| --- | --- | --- |
[Model validation](https://ml.usegalaxy.eu/root?tool_id=sklearn_model_validation) | Model Validation includes cross_validate, cross_val_predict, learning_curve, and more | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Pairwise Metrics](https://ml.usegalaxy.eu/root?tool_id=sklearn_pairwise_metrics) | Evaluate pairwise distances or compute affinity or kernel for sets of samples | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Train/Test evaluation](https://ml.usegalaxy.eu/root?tool_id=sklearn_train_test_eval) | Train, Test and Evaluation to fit a model using part of dataset and evaluate using the rest | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Model Prediction](https://ml.usegalaxy.eu/root?tool_id=model_prediction) | Model Prediction predicts on new data using a preffited model | [Chollet et al. 2011](https://keras.io)
[Fitted model evaluation](https://ml.usegalaxy.eu/root?tool_id=sklearn_fitted_model_eval) | Evaluate a Fitted Model using a new batch of labeled data | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Model fitting](https://ml.usegalaxy.eu/root?tool_id=sklearn_model_fit) | Fit a Pipeline, Ensemble or other models using a labeled dataset | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Preprocessing and feature selection

Feature selection and preprocessing.

Tool | Description | Reference
| --- | --- | --- |
[Data preprocessing](https://ml.usegalaxy.eu/root?tool_id=sklearn_data_preprocess) | Preprocess raw feature vectors into standardized datasets  | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Feature selection](https://ml.usegalaxy.eu/root?tool_id=sklearn_feature_selection) | Feature Selection module, including univariate filter selection methods and recursive feature elimination algorithm | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Deep learning

Build and use deep neural networks.

Tool | Description | Reference
| --- | --- | --- |
[Batch Models](https://ml.usegalaxy.eu/root?tool_id=keras_batch_models) | Build Deep learning Batch Training Models with online data generator for Genomic/Protein sequences and images | [Chollet et al. 2011](https://keras.io)
[Model Builder](https://ml.usegalaxy.eu/root?tool_id=keras_model_builder) | Create deep learning model with an optimizer, loss function and fit parameters | [Chollet et al. 2011](https://keras.io)
[Model Config](https://ml.usegalaxy.eu/root?tool_id=keras_model_config) | Create a deep learning model architecture using Keras | [Chollet et al. 2011](https://keras.io)
[Train and evaluation](https://ml.usegalaxy.eu/root?tool_id=keras_train_and_eval) | Deep learning training and evaluation either implicitly or explicitly  | [Chollet et al. 2011](https://keras.io)


## Visualization

Plotting and visualization.

Tool | Description | Reference
| --- | --- | --- |
[Regression performance plots](https://ml.usegalaxy.eu/root?tool_id=plotly_regression_performance_plots) | Plot actual vs predicted curves and residual plots of tabular data |
[ML performance plots](https://ml.usegalaxy.eu/root?tool_id=plotly_ml_performance_plots) | Plot confusion matrix, precision, recall and ROC and AUC curves of tabular data |
[Visualization](https://ml.usegalaxy.eu/root?tool_id=ml_visualization_ex) | Machine Learning Visualization Extension includes several types of plotting for machine learning | [Chollet et al. 2011](https://keras.io)


## Utilities

General data and table manipulation tools.

Tool | Description | Reference
| --- | --- | --- |
[Table compute](https://ml.usegalaxy.eu/root?tool_id=table_compute) | The power of the pandas data library for manipulating and computing expressions upon tabular data and matrices. |
[Datamash operations](https://ml.usegalaxy.eu/root?tool_id=datamash_ops) | Datamash operations on tabular data |
[Datamash transpose](https://ml.usegalaxy.eu/root?tool_id=datamash_transpose) | Transpose rows/columns in a tabular file |
[Sample Generator](https://ml.usegalaxy.eu/root?tool_id=sklearn_sample_generator) | Generate random samples with controlled size and complexity | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)
[Train/Test splitting](https://ml.usegalaxy.eu/root?tool_id=sklearn_train_test_split) | Split Dataset into training and test subsets | [Pedregosa et al. 2011](https://jmlr.csail.mit.edu/papers/v12/pedregosa11a.html)


## Interactive Environments

You have done the heavy lifting and now want to use your coding skills inside Jupyter or RStudio? Work on data with the following:

Tool | Description | Reference
| --- | --- | --- |
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


