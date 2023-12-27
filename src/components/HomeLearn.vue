<template>
    <div class="container-fluid-real p-0">
        <div class="container-fluid-real bgBright bgGradient">
            <div class="container-fluid-real p-0">
                <div class="row area learn">
                    <svg viewBox="15 0 80 40" preserveAspectRatio="none" width="5000" height="50" class="wave top">
                        <use xlink:href="images/icons/waveNounProject.svg#path" />
                    </svg>
                </div>
            </div>
            <div class="container p-3">
                <div class="row">
                    <div class="col-xl-4">
                        <h2 class="learn">Learn</h2>
                        <p class="learn">
                            From curated tools and workflows to self-paced tutorials available on the Galaxy Training
                            Network (GTN), there are plenty of materials to learn from.
                        </p>
                    </div>
                    <div class="col-xl-8 col-md-12 area learn">
                        <a
                            :href="b.link"
                            v-for="b in this.buttonContent"
                            :key="b.title"
                            role="button"
                            rel="noopener"
                            target="_blank"
                            class="btn btn-outline-primary text-left text-decoration-none mb-4 ml-3"
                        >
                            <span class="icon fa far fa-arrow-circle-o-right iconXlarge pt-2" aria-hidden="true"></span>
                            <div class="title text-decoration">{{ b.title }}</div>
                            <div class="text text-decoration">{{ b.text }}</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="container-fluid-real p-0">
                <div class="row area learn">
                    <svg viewBox="15 0 80 40" preserveAspectRatio="none" width="5000" height="50" class="wave">
                        <use xlink:href="images/icons/waveNounProject.svg#path" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeLearn",
    data() {
        return {
            buttonContent: [
                {
                    title: "Tutorials",
                    text: "Access topic-based tutorials for free.",
                    link: "https://training.galaxyproject.org",
                },
                {
                    title: "Videos",
                    text: "Learn by watching, including conferences.",
                    link: "https://www.youtube.com/channel/UCwoMMZPbz1L9AZzvIvrvqYA",
                },
                {
                    title: "Vetted workflows",
                    text: "(Re)use or adapt quality workflows.",
                    link: "https://training.galaxyproject.org/training-material/workflows/list",
                },
                {
                    title: "Blog",
                    text: "Read highlights from the experts.",
                    link: "/blog/",
                },
                {
                    title: "Data",
                    text: "Pull data from many popular repositories.",
                    link: "https://training.galaxyproject.org/training-material/topics/admin/tutorials/data-library/tutorial.html",
                },
                {
                    title: "Community",
                    text: "Join the world-wide Galaxy community.",
                    link: "https://galaxyproject.org/community/",
                },
                {
                    title: "FAQ",
                    text: "",
                    link: "https://training.galaxyproject.org/training-material/faqs/index.html",
                },
                {
                    title: "Help and support",
                    text: "",
                    link: "https://help.galaxyproject.org/",
                },
            ],
        };
    },
};
</script>
