<template>
    <div class="container-fluid-real mt-4 p-3 bgBright sectionLearn">
        <div class="container">
            <div class="row">
                <div class="col col-4">
                    <h2 class="gx-h2-dark">Learn</h2>
                    <p class="text">
                        From curated tools and workflows to self-paced tutorials available on the Galaxy Training Network (GTN), there are plenty of materials to learn from.
                    </p>
                </div>
                <div class="col col-8">
                    <a :href="b.link" v-for="b in this.buttonContent" :key="b.title" role="button" rel="noopener" target="_blank" class="btn btn-outline-primary text-left mb-4 ml-3">
                        <span class="icon fa far fa-arrow-circle-o-right iconXlarge pt-2" aria-hidden="true"></span>
                        <div class="title">{{ b.title }}</div>
                        <div class="text">{{ b.text }}</div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeLearn',
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
            ]
        };
    }
}
</script>

<style scoped>

.gx-h2-dark {
  font-size: 3rem;
  font-weight: 700;
  color: black;
}

.text {
    font-size: 1.45rem;
}

a {
    min-width: 335px;
    padding-left: 20px;

    .title {
        font-size: 1.7rem;
        color: black;
        text-decoration: underline;
        font-weight: 400;
    }
    &.btn-outline-primary:hover .title {
        color: white !important;
    }

    .text {
        min-height: 30px;
        font-size: 0.8rem;
        color: black;
        font-weight: 400;
    }

    &.btn-outline-primary:hover .text {
        color: white !important;
    }

    .iconXlarge {
        float: right !important;
        font-size: 50px;
    }
}
</style>
