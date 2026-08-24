---
title: Galaxy Ecology
---

<slot name="/bare/eu/usegalaxy/notices" />

<style>
  .usegalaxy-feature-grid,
  .usegalaxy-card-grid {
    display: grid !important;
    gap: 1rem;
    align-items: stretch;
    justify-content: stretch !important;
  }

  .usegalaxy-feature-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  }

  .usegalaxy-card-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));
  }

  @media (min-width: 900px) {
    .usegalaxy-feature-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .usegalaxy-feature-grid > div,
  .usegalaxy-card-grid > div {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
  }

  .usegalaxy-feature-grid .bs-compat.card,
  .usegalaxy-card-grid .bs-compat.card {
    border: 0 !important;
    background: transparent !important;
    margin: 0 !important;
  }

  .usegalaxy-feature-grid .bs-compat.card-body,
  .usegalaxy-card-grid .bs-compat.card-body {
    padding: 0 !important;
  }
</style>

# Welcome to **Galaxy for Ecology** -- a web platform to get, process, analyze and visualize biodiversity data

<center><img src="/assets/media/usegalaxy/ecology/infographie_pndb.png" style="max-width:95%; height:auto;" alt="PNDB french Biodiversity e-infrastructure"/></center>
<br /><br />

<div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; align-items:stretch;">

  <!-- CARD 1 -->
  <div style="flex:1 1 24rem; max-width:26rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display:flex; flex-direction:column; height:100%;">
      <div class="card-body" style="display:flex; flex-direction:column; flex:1;">
        <h2 class="card-title text-dark" style="margin-top: 0;">Guide tour</h2>
        <p class="card-text">Are you new to Galaxy, or returning after a long time, and looking for help to get started?</p>
        <img src="/images/logos/galaxy-eu.png" style="max-width:100%; height:auto; margin:2rem 0;" />
        <div class="text-center" style="margin-top:auto;">
          <a href="https://ecology.usegalaxy.eu/tours/core.galaxy_ui" target="_blank">
            <button type="button" class="btn btn-primary btn-lg" style="white-space:normal; max-width:100%; display:inline-block;">Take a guide tour through Galaxy’s user interface.</button>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- CARD 2 -->
  <div style="flex:1 1 24rem; max-width:26rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display:flex; flex-direction:column; height:100%;">
      <div class="card-body" style="display:flex; flex-direction:column; flex:1;">
        <h2 class="card-title text-dark" style="margin-top: 0;">Tutorials</h2>
        <p class="card-text">Want to learn about ecology analyses?</p>
        <img src="/images/logos/GTNLogo600.png" style="max-width:100%; height:auto; margin:2rem 0;" />
        <div class="text-center" style="margin-top:auto;">
          <a href="https://training.galaxyproject.org/training-material/topics/ecology/" class="show-iframe" data-target="displayhere">
            <button type="button" class="btn btn-primary btn-lg" style="white-space:normal; max-width:100%; display:inline-block;">Check our tutorials</button>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- CARD 3 -->
  <div style="flex:1 1 24rem; max-width:26rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display:flex; flex-direction:column; height:100%;">
      <div class="card-body" style="display:flex; flex-direction:column; flex:1;">
        <h2 class="card-title text-dark" style="margin-top: 0;">Workflows</h2>
        <img src="/assets/media/usegalaxy/ecology/workflow3.png" style="max-width:100%; height:auto; margin:2rem 0;" />
        <div class="text-center" style="margin-top:auto;">
          <a href="https://ecology.usegalaxy.eu/workflows/list_published" target="_blank">
            <button type="button" class="btn btn-primary btn-lg" style="white-space:normal; max-width:100%; display:inline-block;">Access public workflows</button>
          </a>
        </div>
      </div>
    </div>
  </div>

</div>


<br /><br />
<iframe id="displayhere" frameborder="0" style="display:none;" width="100%" height="700"></iframe>

# Projects

<div style="display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:1rem; align-items:stretch;">
  <!-- CARD 1 -->
  <div style="flex:1 1 26rem; max-width:28rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display:flex; flex-direction:column; height:100%;">
      <div class="card-body" style="display:flex; flex-direction:column; flex:1;">
        <h2 class="card-title text-dark" style="margin-top: 0;">Citizen science on marmalade hoverflies</h2>
        <div style="margin:0.5rem 0;">
          <span class="badge" style="background-color:#46AA5D; color:white; font-size:0.95rem; padding:0.4em 0.6em;">Vigie Nature</span>
          <span class="badge" style="background-color:#A47FE3; color:white; font-size:0.95rem; padding:0.4em 0.6em;">H2020 European project</span>
        </div>
        <div style="margin-top: 1rem;">
          <p class="card-text">Want to classify hoverflies pictures?</p>
        </div>
        <img src="/assets/media/usegalaxy/ecology/Example_image_task.jpg" style="max-width:100%; height:auto; margin:2rem 0;" />
        <p class="card-text"> The aim of the task is to classify ~5000 hoverfly images collected by the SPIPOLL citizen science project and identify the sex by looking at their relative eyes position.</p>
        <div class="text-center" style="margin-top:auto;">
          <a href="https://usegalaxy.eu/gapars-experiment/" class="show-iframe" data-target="displayhere2">
            <button type="button" class="btn btn-primary btn-lg" style="white-space:normal; max-width:100%; display:inline-block;">Try our crowdsourcing project</button>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- CARD 2 -->
  <div style="flex:1 1 26rem; max-width:28rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display: flex; flex-direction: column; height: 100%;">
        <div class="card-body" style="display: flex; flex-direction: column; flex: 1;">
            <h2 class="card-title text-dark" style="margin-top: 0;">Antarctic use cases</h2>
            <div style="margin:0.5rem 0;">
                <span class="badge" style="background-color:#C87967; color:white; font-size:0.95rem; padding:0.4em 0.6em;">French BON EBV Operationalization pilot</span>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">TUTORIALS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/phylodiversity_workflow/tutorial.html" class="show-iframe" data-target="displayhere2">
                        <button type="button" class="btn btn-primary">Phylodiversity analysis</button>
                    </a>
                    <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/Ecoregionalization_tutorial/tutorial.html" class="show-iframe" data-target="displayhere2">
                        <button type="button" class="btn btn-primary">Ecoregionalization</button>
                    </a>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">WORKFLOWS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://ecology.usegalaxy.eu/published/workflow?id=cab7b9bab4cddb0f" target="_blank">
                        <button type="button" class="btn btn-primary">State of the Environment in Antarctic</button>
                    </a>
                    <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/Ecoregionalization_tutorial/workflows/Ecoregionalization_workflow.html" target="_blank">
                        <button type="button" class="btn btn-primary">Ecoregionalization</button>
                    </a>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">TOOLS</p>
                <p class="card-text">Several tools corresponding to these workflows and tutorials can be found in Galaxy's left sidebar under the ecoregionalization section, the phylodiversity section et the interactive tools section.</p>
            </div>
        </div>
    </div>
  </div>
  <!-- CARD 3 -->
  <div style="flex:1 1 26rem; max-width:28rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display: flex; flex-direction: column; height: 100%;">
        <div class="card-body" style="display: flex; flex-direction: column; flex: 1;">
            <h2 class="card-title text-dark" style="margin-top: 0;">PAMPA</h2>
            <div style="margin:0.5rem 0;">
                <span class="badge" style="background-color:#C87967; color:white; font-size:0.95rem; padding:0.4em 0.6em;">French BON EBV Operationalization pilot</span>
            </div>
            <img src="/assets/media/usegalaxy/ecology/PAMPA.jpg" style="max-width:100%; height:auto;" />
            <p class="card-text" style="font-weight: bold;">TUTORIALS</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/PAMPA-toolsuite-tutorial/tutorial.html" class="show-iframe" data-target="displayhere2">
                    <button type="button" class="btn btn-primary">Biodiversity metrics with PAMPA</button>
                </a>
            </div>
            <p class="card-text" style="font-weight: bold;">WORKFLOWS</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/PAMPA-toolsuite-tutorial/workflows/Galaxy-Workflow-Compute_and_analyze_biodiversity_metrics_with_PAMPA_toolsuite.html" target="_blank">
                     <button type="button" class="btn btn-primary">PAMPA toolsuite workflow</button>
                </a>
            </div>
            <p class="card-text" style="font-weight: bold;">TOOLS</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                <a href="https://ecology.usegalaxy.eu/root?tool_id=interactive_tool_pampa" target="_blank">
                    <button type="button" class="btn btn-primary">PAMPA interactive tool</button>
                </a>
                <a href="https://ecology.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/ecology/pampa_communitymetrics/pampa_communitymetrics/0.0.2" target="_blank">
                        <button type="button" class="btn btn-primary">Community metrics</button>
                </a>
                <a href="https://ecology.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/ecology/pampa_glmcomm/pampa_glmcomm/0.0.2" target="_blank">
                        <button type="button" class="btn btn-primary">GLM on community</button>
                </a>
                <a href="https://ecology.usegalaxy.eu/root?tool_id=toolshed.g2.bx.psu.edu/repos/ecology/pampa_glmsp/pampa_glmsp/0.0.2" target="_blank">
                        <button type="button" class="btn btn-primary">GLM on population</button>
                </a>
            </div>
        </div>
    </div>
  </div>
  <!-- CARD 4 -->
  <div style="flex:1 1 26rem; max-width:28rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display: flex; flex-direction: column; height: 100%;">
        <div class="card-body" style="display: flex; flex-direction: column; flex: 1;">
            <h2 class="card-title text-dark" style="margin-top: 0;">GAIA DATA</h2>
            <a href="https://www.gaia-data.org/" target="_blank">
                <center><img src="/assets/media/usegalaxy/ecology/logo-data-gaia_default.png" style="width: 140px; height:auto;"/></center>
            </a>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">TUTORIALS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/species-distribution-modeling/tutorial.html" class="show-iframe" data-target="displayhere2">
                        <button type="button" class="btn btn-primary">Species distribution modeling</button>
                    </a>
                    <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/remote-sensing/tutorial.html" class="show-iframe" data-target="displayhere2">
                        <button type="button" class="btn btn-primary">Sentinel 2</button>
                    </a>
                    <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/panoply_ebv/tutorial.html" class="show-iframe" data-target="displayhere2">
                        <button type="button" class="btn btn-primary">Visualize EBV cube data</button>
                    </a>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">TOOLS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://ecology.usegalaxy.eu/root?tool_id=interactive_tool_jupytergis_notebook" target="_blank">
                        <button type="button" class="btn btn-primary">JupyterGIS interactive tool</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/root?tool_id=interactive_tool_pangeo_notebook" target="_blank">
                        <button type="button" class="btn btn-primary">Pangeo intercative tool</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/root?tool_id=interactive_tool_qgis" target="_blank">
                        <button type="button" class="btn btn-primary">QGIS interactive tool</button>
                    </a>
                     <a href="https://ecology.usegalaxy.eu/root?tool_id=interactive_tool_stac" target="_blank">
                        <button type="button" class="btn btn-primary">STAC catalog</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
  <!-- CARD 5 -->
  <div style="flex:1 1 26rem; max-width:28rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display: flex; flex-direction: column; height: 100%;">
        <div class="card-body" style="display: flex; flex-direction: column; flex: 1;">
            <h2 class="card-title text-dark" style="margin-top: 0;">MOOREV</h2>
            <div style="margin:0.5rem 0;">
                <span class="badge" style="background-color:#9E9E9E; color:white; font-size:0.95rem; padding:0.4em 0.6em;">IA</span>
                <span class="badge" style="background-color:#B0AC43; color:white; font-size:0.95rem; padding:0.4em 0.6em;">Annotation</span>
            </div>
            <a href="https://moorev.fr/" target="_blank">
                <center><img src="/assets/media/usegalaxy/ecology/moorev.png" style="max-width:100%; height:auto; margin-top:1rem;" /></center>
            </a>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">TUTORIALS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://training.galaxyproject.org/training-material/topics/imaging/tutorials/Annotation_AI_Pipeline/tutorial.html" class="show-iframe" data-target="displayhere2">
                        <button type="button" class="btn btn-primary">AI pipeline for annotating marine species</button>
                    </a>
                    <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/yolo_predict_deepsea/tutorial.html" class="show-iframe" data-target="displayhere2">
                        <button type="button" class="btn btn-primary">Object detection with YOLO</button>
                    </a>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">WORKFLOWS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://training.galaxyproject.org/training-material/topics/ecology/tutorials/yolo_predict_deepsea/workflows/Galaxy-Workflow-tuto_yolo_DeepSeaSpy.html#test-tuto-yolo-deepseaspy" target="_blank">
                        <button type="button" class="btn btn-primary">YOLO DeepSeaSpy</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/u/ylebras/w/segment-fishes-on-videos-and-modify-annotation-of-segmented-features" target="_blank">
                        <button type="button" class="btn btn-primary">Segment fishes on videos</button>
                    </a>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">TOOLS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fsam3_semantic_segmentation%2Fsam3_semantic_segmentation%2F1.0.1%2Bgalaxy6&version=1.0.1+galaxy6" target="_blank">
                        <button type="button" class="btn btn-primary">SAM3</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fedit_coco_annotation%2Fedit_coco_annotation%2F1.0.0%2Bgalaxy0&version=1.0.0+galaxy0" target="_blank">
                        <button type="button" class="btn btn-primary">Edit COCO</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fcoco_annotation_visualizer%2Fcoco_annotation_visualizer%2F1.0.0&version=1.0.0" target="_blank">
                        <button type="button" class="btn btn-primary">COCO Annotation Visualizer</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fcoco2labelme%2Fcoco2labelme%2F1.0.1&version=1.0.1" target="_blank">
                        <button type="button" class="btn btn-primary">COCO to LabelMe JSON Converter</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fyolo_training%2Fyolo_training%2F8.3.0%2Bgalaxy5&version=8.3.0+galaxy5" target="_blank">
                        <button type="button" class="btn btn-primary">Perform YOLO training</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fbgruening%2Fyolo_predict%2Fyolo_predict%2F8.3.0%2Bgalaxy5&version=8.3.0+galaxy5" target="_blank">
                        <button type="button" class="btn btn-primary">Perform YOLO image labeling</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
  <!-- CARD 6 -->
  <div style="flex:1 1 26rem; max-width:28rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display: flex; flex-direction: column; height: 100%;">
        <div class="card-body" style="display: flex; flex-direction: column; flex: 1;">
            <h2 class="card-title text-dark" style="margin-top: 0;">GINAMO Biodiversa+</h2>
            <div style="margin:0.5rem 0;">
                <span class="badge" style="background-color:#C87967; color:white; font-size:0.95rem; padding:0.4em 0.6em;">French BON EBV Operationalization pilot</span>
                <span class="badge" style="background-color:#2f8e83; color:white; font-size:0.95rem; padding:0.4em 0.6em;margin-top:0.5em;">Genetic composition</span>
            </div>
            <a href="https://www.biodiversa.eu/2024/04/15/ginamo/" target="_blank">
                <center><img src="/assets/media/usegalaxy/ecology/ginamo.webp" style="width: 200px; height:auto;margin-top:1rem;" /></center>
            </a>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">WORKFLOWS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://ecology.usegalaxy.eu/published/workflow?id=5dc5e056c5f4e0da" target="_blank">
                        <button type="button" class="btn btn-primary">From SSRs to genetic EBVs</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/published/workflow?id=8f5c84fb0d286050" target="_blank">
                        <button type="button" class="btn btn-primary">From SNPs to genetic EBVs</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/published/workflow?id=e1c997e5ad520307" target="_blank">
                        <button type="button" class="btn btn-primary">SSR filtering</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/published/workflow?id=e5cacefc738764f9" target="_blank">
                        <button type="button" class="btn btn-primary">VCF filtering</button>
                    </a>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">TOOLS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Feffective_population_size_ld_method%2Feffective_population_size_ld_method%2F0.2.2&version=0.2.2" target="_blank">
                        <button type="button" class="btn btn-primary">LDNe estimation</button>
                    </a>
                     <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fpopulation_genomics_vcf_filtering%2Fpopulation_genomics_vcf_filtering%2F0.2.0&version=0.2.0" target="_blank">
                        <button type="button" class="btn btn-primary">VCF filtering</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Flea_snmf_application%2FLEA_snmf_application%2F0.1.0&version=0.1.0" target="_blank">
                        <button type="button" class="btn btn-primary">Genetic Clustering</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fssrfilter%2Fssrfilter%2F0.1.0&version=0.1.0" target="_blank">
                        <button type="button" class="btn btn-primary">Filtering SSR</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fdapc_kmeans%2Fdapc_kmeans%2F0.1.0&version=0.1.0" target="_blank">
                        <button type="button" class="btn btn-primary">DAPC to genotype data</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fgenetic_format_conversion%2Fgenetic_format_conversion%2F0.2.1&version=0.2.1" target="_blank">
                        <button type="button" class="btn btn-primary">Genetic format conversion</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fpopulation_genetics_stats%2Fpopulation_genetics_stats%2F0.2.0&version=0.2.0" target="_blank">
                        <button type="button" class="btn btn-primary">Population Genetics Statistics</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fpopulation_genomics_split_vcf_by_pop%2Fpopulation_genomics_split_vcf_by_pop%2F0.2.0&version=0.2.0" target="_blank">
                        <button type="button" class="btn btn-primary">Split VCF by pop</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fpopulation_genomics_vcf_keep_remove_individuals%2Fpopulation_genomics_vcf_keep_remove_individuals%2F0.2.0&version=0.2.0" target="_blank">
                        <button type="button" class="btn btn-primary">Keep/remove individuals (VCF)</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fpopulation_genomics_vcf_subset%2Fpopulation_genomics_vcf_subset%2F0.2.0&version=0.2.0" target="_blank">
                        <button type="button" class="btn btn-primary">Random SNP subsetting (VCF)</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
  <!-- CARD 7 -->
  <div style="flex:1 1 26rem; max-width:28rem; border:1px solid #6c757d; background:#f8f9fa; padding:1rem; border-radius:6px; box-sizing:border-box; display:flex; flex-direction:column;">
    <div class="card border-secondary bg-light mb-1 mx-1" style="display: flex; flex-direction: column; height: 100%;">
        <div class="card-body" style="display: flex; flex-direction: column; flex: 1;">
            <h2 class="card-title text-dark" style="margin-top: 0;">One Forest Vision </h2>
            <div style="margin:0.5rem 0;">
                <span class="badge" style="background-color:#9E9E9E; color:white; font-size:0.95rem; padding:0.4em 0.6em;">IA</span>
                <span class="badge" style="background-color:#B0AC43; color:white; font-size:0.95rem; padding:0.4em 0.6em;">Annotation</span>
            </div>
            <a href="https://www.oneforestvision.org/" target="_blank">
                <center><img src="/assets/media/usegalaxy/ecology/OFV.png" style="width: 200px; height:auto; margin-top:1rem;" /></center>
            </a>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">TOOLS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://ecology.usegalaxy.eu/?tool_id=toolshed.g2.bx.psu.edu%2Frepos%2Fecology%2Fwildlife_megadetector_huggingface%2Fwildlife_megadetector_huggingface%2F0.1.2%2Bgalaxy0&version=0.1.2+galaxy0" target="_blank">
                        <button type="button" class="btn btn-primary">DeepForestVision</button>
                    </a>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">RELATED PROJECT</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;  justify-content: center;">
                    <a href="https://www.pepr-forestt.org/" target="_blank" style="text-align: center; text-decoration: none; color: inherit;">
                        <img src="/assets/media/usegalaxy/ecology/pepr_forestt.jpg" style="width: 200px; height:auto;"/>
                        <p class="card-text">PEPR FORESTT</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>

<br /><br />
<iframe id="displayhere2" frameborder="0" style="display:none;" width="100%" height="700"></iframe>


# Tools

Galaxy Ecology offers an extensive suite of tools designed for biodiversity data analysis. With hundreds of tools at your disposal, you can explore and perform a wide variety of tasks, including data manipulation, statistical analysis, biodiversity and environmental data retrieval, and visualization.

- **General Tools**   
These tools cover data manipulation, text processing, file conversion, sorting, filtering, and a wide range of data visualization options, including bar charts, scatterplots, heatmaps, and more.

- **Statistical Tools**  
A comprehensive set of statistical methods for data preprocessing, hypothesis testing, classification, multivariate analysis, and model-based techniques like regression and machine learning.

- **Biodiversity data oriented Tools**  
Galaxy Ecology provides specialized tools for biodiversity data, including species occurrence data retrieval, phenology analysis, acoustic monitoring, and GIS data handling.

Explore the full range of tools by using the Tools Panel on the left side of the interface. There, you’ll find an organized list of categories to help you find exactly what you need for your ecological research.

---

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Retrieve all links that trigger the display of the iframe
        const links = document.querySelectorAll('.show-iframe');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();// Prevent default behavior (navigate to another link)
                
                // Retrieve the target URL
                const targetUrl = link.getAttribute('href');
                
                // Hide all iframes
                const iframes = document.querySelectorAll('iframe');
                iframes.forEach(iframe => iframe.style.display = 'none');
                
                // Display the iframe corresponding to the clicked link
                const targetId = link.getAttribute('data-target');
                const targetIframe = document.getElementById(targetId);
                if (targetIframe) {
                    // Update the URL of the iframe with the target link
                    targetIframe.src = targetUrl;  // <-- Insert link into iframe
                    targetIframe.style.display = 'block';
                    
                    targetIframe.scrollIntoView({
		                        block: 'start',
		                        behavior: 'smooth',
		                        inline: 'nearest'});
                }
            });
        });
    });
</script>
