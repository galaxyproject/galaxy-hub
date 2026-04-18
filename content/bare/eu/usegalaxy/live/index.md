---
title: Galaxy Live
components: true
---

<slot name="/bare/eu/usegalaxy/notices" />

<style type="text/css">
#maincontainer {
width: 100% !important;
padding-left: 0px !important;
padding-right: 0px !important;
}

.mcard {
  box-shadow: 0px 0px 10px #ccc;
  display: flex;
  width: 21%;
  flex-direction: column;
  margin: 2em;
  padding: 1em;
}
.mcard .card-img-top {
  width: 100%;
}
.mcard h2{
  text-align: center;
  color: #333;
  padding: 0.5em;
}
.mcard:hover {
  box-shadow: 0px 0px 10px black;
}

.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: 7%;
}

.mcard img {
margin: auto;
}

.live-header-text {
  text-align: justify;
  overflow: hidden;
  padding: 1em;
  background-color: #f8f8f8;
  box-shadow: 0px 0px 10px black;
}

.textcard {
  margin-bottom: 0.5em;
  color: #333;
  text-align: center;
  font-weight: bold;
}

</style>
<div class="live-header-text">
	<p>
    Welcome to the live instance of the European Galaxy server. This is your gateway to start interactive tools, such as
    <a href="https://jupyter.org/">Jupyter</a>, <a href="https://rstudio.com/">RStudio</a> or other web-applications.
    Each Interactive Tool runs in its own container on the <a href="https://www.denbi.de/cloud" target="_blank">de.NBI-cloud</a>.
    Every <b>registered</b> user can start up to 10 different interactive tools simultaneously and can keep them running for up to 30 days.
    You can interact with Galaxy via the API and in Jupyter and RStudio we have added convenient functions (put/get) to transfer data
    back and forth between Galaxy and Jupyter resp. RStudio. Of course, you can also store your entire Notebook or R session back to Galaxy and
    save all provenance information in a permanent storage.
	</p>
	<p>
    If you start an Interactive tool it will keep spinning in a yellow state as long as the Container is running. To open your Tool you open the link
    at <a href="https://live.usegalaxy.eu/interactivetool_entry_points/list" target="_top">User → Active InteractiveTools</a>. The eye icon of your Galaxy dataset
    is not working yet. A <a href="https://training.galaxyproject.org/training-material/topics/galaxy-ui/tutorials/jupyterlab/tutorial.html">Jupyter</a> and <a href="https://training.galaxyproject.org/training-material/topics/galaxy-ui/tutorials/rstudio/tutorial.html">RStudio</a> tutorial is provided by the <a href="https://training.galaxyproject.org">Galaxy training Network</a>.
    </p>
	<p>
    Enjoy!
	</p>
</div>
<div class="flex-container">
    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_jupyter_notebook" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/jupyter.svg" title="Jupyter Lab with various kernerls including Python, R and Julia" />
      <p class="textcard">Jupyter lab for Python, R and Julia</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_rstudio" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/rstudio.png" title="RStudio with a basic R packages pre-installed."/>
      <p class="textcard">RStudio with basic R packages</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_mgnify_notebook" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/mgnify.png" title="Jupyter Notebooks for the MGnify API"/>
      <p class="textcard">Jupyter Notebooks for the MGnify API</p>
    </a>
	
    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_askomics" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/askomics.png" title="AskOmics is a visual SPARQL query interface supporting both intuitive data integration and querying while shielding the user from most of the technical difficulties underlying RDF and SPARQL."/>
      <p class="textcard">SPARQL query interface</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_bam_iobio" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/bam.iobio.png" title="Examine your sequence alignment file in seconds." />
      <h2>BAM IOBIO</h2>
      <p class="textcard">Examine sequence alignment in seconds</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_vcf_iobio" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/vcf.iobio.io.png" title="Examine your variant file in seconds." />
      <h2>VCF IOBIO</h2>
      <p class="textcard">Examine your variant file in seconds</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_cellxgene" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/cellxgene.svg" title="An interactive explorer for single-cell transcriptomics data" />
      <p class="textcard">Explore single-cell transcriptomics data</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_ethercalc" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/ethercalc.png" title="EtherCalc is a web spreadsheet" />
      <h2>Ethercalc</h2>
      <p class="textcard">A web spreadsheet</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_blobtoolkit" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/blobtoolkit.png" title="BlobToolKit Viewer is a genome-scale dataset visualistion" />
      <h2>BlobToolKit</h2>
      <p class="textcard">Genome-scale dataset visualistion</p>
    </a>

    <!--a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_paraview" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/paraview.svg" title="ParaView is an open-source, multi-platform data analysis and visualization application." />
      <h2>Paraview</h2>
      <p class="textcard">Multi-platform data analysis and visualization</p>
    </a-->

    <!--a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_neo4j" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/neo4j.png" title="Neo4j is a graph database management system storing and processing data as graphs." />
      <p class="textcard">Graph database management system</p>
    </a-->

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_phinch" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/phinch.svg" title="Phinch is a data visualization framework aimed at promoting novel explorations of large biological datasets (microbiomes, metagenomes, etc.)" />
      <p class="textcard">Visualise large biological datasets (microbiomes, metagenomes, etc.)</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_metashark" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/Metashark2.png" title="MetaShARK (Metadata Shiny Automated Resources and Knowledge) is a tool designed to generate, notably through automatic inference, metadata through Ecological Metadata Language standard" />
      <h2>MetaShARK</h2>
      <p class="textcard">Generate Metadata from data using EML standard</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_wallace" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/wallace.jpg" title="Wallace is a modular platform for reproducible modeling of species niches and distributions" />
      <h2>Wallace</h2>
      <p class="textcard">Model niches and distributions of species</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_isee" target="_top">
      <img class="card-img-top" src="https://raw.githubusercontent.com/iSEE/iSEE/master/inst/www/iSEE.png" title="iSEE - SummarizedExperiment Explorer" />
      <p class="textcard">iSEE - SummarizedExperiment Explorer</p>
    </a>
	
    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_wilson" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/wilson.png" title="Webbased Interactive Omics visualizatioN" />
      <p class="textcard">Webbased Interactive Omics visualization</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_pyiron" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/pyiron.png" title="An integrated development environment (IDE) for computational materials science." />
      <p class="textcard">IDE for Computational Materials Science</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_guacamole_desktop" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/xfce.png" title="Virtual Desktop environment based on Guacamole, Ubuntu and XFCE" />
      <p class="textcard">Virtual Desktop environment</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_climate_notebook" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/jp-climate.png" title="Jupyter Lab with Python ecosystem for ocean/atmosphere/land/climate science. The list of packages used in this image is similar to what is available for Pangeo" />
      <p class="textcard">Jupyter lab for ocean / atmosphere / land / climate python ecosystem</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_panoply" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/panoply.png" title="Panoply plots geo-referenced and other arrays from netCDF, HDF, and other datasets." />
      <p class="textcard">Panoply netCDF Data Viewer</p>
    </a>

    <a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_higlass" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/higlass.jpg" title="HiGlass for visualise and interactivly explorer Hi-C  data" />
      <p class="textcard">HiGlass</p>
    </a>

    <!--a class="mcard" href="https://live.usegalaxy.eu/?tool_id=interactive_tool_openrefine" target="_top">
      <img class="card-img-top" src="https://live.usegalaxy.eu/assets/media/interactive/openrefine.png" title="OpenRefine is a powerful tool for working with messy data" />
      <p class="textcard">OpenRefine</p>
    </a-->

</div>
