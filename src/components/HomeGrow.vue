<template>
    <div class="container sectionGrow">
        <div class="row">
            <div class="col p-0">
                <h2 class="gx-h2 mt-4">Grow with Galaxy</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="card bg1">
                    <a href="https://www.zotero.org/groups/1732893/galaxy" rel="noopener" target="_blank" class=" text-white">
                        <h2 class="font-weight-bold">Recent publications</h2>
                    </a>
                    <a :href="p.link" class="mb-3 text-white small" v-for="p in papers" role="button" rel="noopener" target="_blank">{{ p.title }}</a>
                    <a href="citing-galaxy/" class="text-white">
                        <h2 class="font-weight-bold">Cite Galaxy</h2>
                    </a>
                    <span class="small text-white">
                        The Galaxy Community. The Galaxy platform for accessible, reproducible and collaborative biomedical analyses: 2022 update, Nucleic Acids Research, Volume 50, Issue W1, 5 July 2022, Pages W345–W351.
                    </span>
                </div>
            </div>
            <div class="col">
                <div class="card bg2">
                    <h2 class="font-weight-bold">Popular tutorials</h2>
                    <ul class="large">
                        <li v-for="t in this.tutorials" :key="t.title">
                            <a :href="t.link" role="button" rel="noopener" target="_blank" class="text-decoration-none">
                                <span class="title">{{ t.title }}</span>
                            </a>
                        </li>
                    </ul>
                    <div class="d-flex justify-content-center">
                        <a href="https://training.galaxyproject.org" role="button" rel="noopener" target="_blank" class="btn btn-info text-decoration-none mb-4 w-50">See more</a>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card bg3">
                    <h2 class="font-weight-bold">Exemplar use cases</h2>
                    See how Galaxy cooperates and helps other projects. These are great exemplars of how Galaxy is being used in production settings.
                    <div class="row mt-4 mb-4">
                        <div class="col">
                            <div class="text-center mt-4">
                                <a href="projects/vgp/" rel="noopener" target="_blank">
                                    <img src="/images/vgp/vgp_logo_dark.svg" alt="VGP logo" class="w-100">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4 mb-4">
                        <div class="col">
                            <div class="text-center mt-3">
                                <a href="projects/microbial/" rel="noopener" target="_blank">
                                    <img src="/images/microgalaxy/microgalaxy_logo.svg" alt="microGalaxy logo" class="w-100">
                                </a>
                            </div>
                        </div>
                        <div class="col">
                            <div class="text-center">
                                <a href="projects/mpxv/" rel="noopener" target="_blank" class="w-100 mLogo">
                                    <span class="icon fa fas fa-viruses pt-2" aria-hidden="true"></span>
                                    <div class="text">Monkey Pox</div>
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
    name: 'HomeGrow',
    data() {
        return {
            papers: [
                {
                    title: "Goonasekera, N., Bromhead, C., Gladman, S., Coraor, N., Gruning, B., & Afgan, E. (2023). Right-sizing compute resource allocations for bioinformatics tools with Total Perspective Vortex. arXiv preprint arXiv:2312.02060.",
                    link: "https://arxiv.org/abs/2312.02060",
                },
                {
                    title: "Hiltemann, S., Rasche, H., Gladman, S., Hotz, H. R., Larivière, D., Blankenberg, D., ... & Batut, B. (2023). Galaxy Training: A powerful framework for teaching!. PLoS computational biology, 19(1), e1010752.",
                    link: "https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1010752",
                },
                {
                    title: "Hakimzadeh, A., Abdala Asbun, A., Albanese, D., Bernard, M., Buchner, D., Callahan, B., ... & Anslan, S. (2023). A pile of pipelines: An overview of the bioinformatics software for metabarcoding data analyses. Molecular Ecology Resources.",
                    link: "https://pubmed.ncbi.nlm.nih.gov/37548515/",
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
            ]
        };
    }
}
</script>

<style scoped>
.gx-h2 {
  font-size: 3rem;
  font-weight: 700;
  color: white;
}

.sectionGrow {
    margin-bottom: 5rem;
    .card {
        position: relative;
        display: flex;
        color: white;
        font-size: 1.3rem;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        text-align: left;
        padding: 13px 20px;
        text-decoration: none !important;
        height: 42rem;
        border-radius: 20px;

        h2 {
            margin-top: 0;
        }

        &.bg1 {
            background: linear-gradient(155deg, #00A7E1 44%, rgba(249,206,215,.8));
        }

        &.bg2 {
            background: linear-gradient(155deg, rgba(249,206,215,.8) 4%, rgba(63, 227, 249, .8)); /* #3FE3F9); */
        }

        &.bg3 {
            background: linear-gradient(155deg, rgba(63, 227, 249, .8) 44%, #C6A669);
        }
    }

    ul.large {
        line-height: 1.5rem;
        li {
            font-weight: 600;
            padding-bottom: 2.2rem;

            a {
                .title {
                    color: white;
                }
            }
        }
    }

    a.mLogo {
        .icon {
            color: #9b1a1a;
            font-size: 6rem;
        }
        .text {
            padding-top: 0.2rem;
            color: #761818;
            font-size: 1.2rem;
            font-weight: 800;
        }
    }
}
</style>
