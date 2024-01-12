<template>
    <div class="container mb-4">
        <div class="row">
            <div class="col p-0">
                <h2 class="mt-4">Grow with Galaxy</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4 mb-3">
                <div class="area grow publications h-100">
                    <a
                        href="https://www.zotero.org/groups/1732893/galaxy"
                        rel="noopener"
                        target="_blank"
                        class="text-white"
                    >
                        <h3>Recent publications</h3>
                    </a>
                    <a
                        :href="p.link"
                        class="mb-3 text-white small"
                        v-for="p in papers"
                        :key="p.title"
                        role="button"
                        rel="noopener"
                        target="_blank"
                        >{{ p.title }}</a
                    >
                    <a href="citing-galaxy/" class="text-white">
                        <h3>Cite Galaxy</h3>
                    </a>
                    <a href="https://doi.org/10.1093/nar/gkac247" target="_blank" class="small text-white">
                        The Galaxy Community. "The Galaxy platform for accessible, reproducible and collaborative
                        biomedical analyses: 2022 update", Nucleic Acids Research, Volume 50, Issue W1, 5 July 2022,
                        Pages W345–W351.
                    </a>
                </div>
            </div>
            <div class="col-xl-4 mb-3">
                <div class="area grow tutorials h-100">
                    <h3>Popular tutorials</h3>
                    <div class="text-white mb-5">
                        Choose from these self-paced tutorials to perform a
                        comprihensive analysis or hone your skills on a specific
                        topic.
                    </div>
                    <ul style="list-style-type: none; padding: 0;">
                        <li v-for="t in this.tutorials" :key="t.title">
                            <a :href="t.link" role="button" rel="noopener" target="_blank" class="text-decoration-none">
                                <div class="link">{{ t.title }}</div>
                            </a>
                        </li>
                    </ul>
                    <div class="d-flex justify-content-center">
                        <a
                            href="https://training.galaxyproject.org"
                            role="button"
                            rel="noopener"
                            target="_blank"
                            class="btn btn-info text-decoration-none mb-4 w-50"
                            >See more</a
                        >
                    </div>
                </div>
            </div>
            <div class="col-xl-4 mb-3">
                <div class="area grow cases h-100">
                    <h3>Exemplar use cases</h3>
                    See how Galaxy cooperates and helps other projects. These
                    are also great exemplars of how Galaxy is being used in
                    production settings.
                    <div class="row mt-4 mb-4">
                        <div class="col">
                            <div class="text-center mt-4">
                                <a href="/projects/vgp/" rel="noopener" target="_blank">
                                    <img src="/images/vgp/vgp_logo_dark.svg" alt="VGP logo" class="w-100" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4 mb-4">
                        <div class="col">
                            <div class="w-50 mx-auto d-block">
                                <a href="/projects/microbial/" rel="noopener" target="_blank">
                                    <img
                                        src="/images/microgalaxy/microgalaxy_logo.svg"
                                        alt="microGalaxy logo"
                                        class="w-100"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4 mb-4">
                        <div class="col">
                            <div class="w-50">
                                <a
                                    href="/projects/mpxv/"
                                    class="mpxvLogo text-decoration-none"
                                    rel="noopener"
                                    target="_blank"
                                >
                                    <div id="mpxvLogo">
                                        <img src="/images/icons/virusesFaSolid.svg" alt="MPXV icon" class="w-100" />
                                        <div class="text">Monkey Pox</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeGrow",
    data() {
        return {
            papers: [
                {
                    title: "Hakimzadeh, Ali, et al. 'A pile of pipelines: An overview of the bioinformatics software for metabarcoding data analyses.'' Molecular Ecology Resources (2023).",
                    link: "https://doi.org/10.1111/1755-0998.13847",
                },
                {
                    title: "Senft, Rebecca A., et al. 'A biologist’s guide to planning and performing quantitative bioimaging experiments.' PLoS Biology 21.6 (2023): e3002167.",
                    link: "https://doi.org/10.1371/journal.pbio.3002167",
                },
                {
                    title: "Banh, Dalton V., et al. 'Bacterial cGAS senses a viral RNA to initiate immunity.' Nature (2023): 1-8.",
                    link: "https://doi.org/10.1038/s41586-023-06743-9",
                },
                {
                    title: "Sokol-Borrelli, Sarah L., et al. 'A transcriptional network required for bradyzoite development in Toxoplasma gondii is dispensable for recrudescent disease.' Nature Communications 14.1 (2023): 6078.",
                    link: "https://doi.org/10.1016/j.envint.2022.107531",
                },
            ],
            tutorials: [
                {
                    title: "Visualization of RNA-Seq results with Volcano Plot",
                    link: "https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/rna-seq-viz-with-volcanoplot/tutorial.html",
                },
                {
                    title: "Reference-based RNA-Seq data analysis",
                    link: "https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/ref-based/tutorial.html",
                },
                {
                    title: "Quality Control",
                    link: "https://training.galaxyproject.org/training-material/topics/sequence-analysis/tutorials/quality-control/tutorial.html",
                },
                {
                    title: "Visualization of RNA-Seq results with heatmap2",
                    link: "https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/rna-seq-viz-with-heatmap2/tutorial.html",
                },
                {
                    title: "RNA-Seq reads to counts",
                    link: "https://training.galaxyproject.org/training-material/topics/transcriptomics/tutorials/rna-seq-reads-to-counts/tutorial.html",
                },
            ],
        };
    },
};
</script>
