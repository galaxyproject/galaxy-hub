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

<center><img src="/assets/media/usegalaxy/ecology/Galaxy-E-concarneau-team-2018-logo.gif" height="225px" alt="PNDB french Biodiversity e-infrastructure"/></center>

<div class="usegalaxy-feature-grid" style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; align-items:stretch;">

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

<iframe id="displayhere" frameborder="0" style="display:none;" width="100%" height="700"></iframe>

# Projects

<div class="usegalaxy-card-grid" style="display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:1rem; align-items:stretch;">
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
            <center><img src="/assets/media/usegalaxy/earth-system/logo-data-gaia_default.png" style="width: 140px; height:auto;"/></center>
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
            <h2 class="card-title text-dark" style="margin-top: 0;">Media annotation and analysis</h2>
            <div style="margin:0.5rem 0;">
                <span class="badge" style="background-color:#9E9E9E; color:white; font-size:0.95rem; padding:0.4em 0.6em;">IA</span>
                <span class="badge" style="background-color:#B0AC43; color:white; font-size:0.95rem; padding:0.4em 0.6em;">Annotation</span>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">TOOLS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://ecology.usegalaxy.eu/root?tool_id=interactive_tool_audiolabeler" target="_blank">
                        <button type="button" class="btn btn-primary">NEAL interactive tool</button>
                    </a>
                    <a href="https://ecology.usegalaxy.eu/root?tool_id=interactive_tool_anylabeling" target="_blank">
                        <button type="button" class="btn btn-primary">AnyLabeling Interactive tool</button>
                    </a>
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <p class="card-text" style="font-weight: bold;">RELATED PROJECTS</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <a href="https://moorev.fr/" target="_blank">
                         <img src="/assets/media/usegalaxy/ecology/moorev.png" style="width: 150px; height:auto; margin:2rem 0;" />
                    </a>
                    <a href="https://www.pepr-forestt.org/" target="_blank">
                        <img src="/assets/media/usegalaxy/ecology/pepr_forestt.jpg" style="width: 120px; height:auto; margin:2rem 0;" />
                    </a>
                    <a href="https://www.oneforestvision.org/" target="_blank">
                        <img src="/assets/media/usegalaxy/ecology/OFV.png" style="width: 120px; height:auto; margin:2rem 0;" />
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>

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
