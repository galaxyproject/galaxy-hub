<template>
    <div id="esg-interactive-poster">
        <h2 id="work-packages">
            <a href="#work-packages" aria-hidden="true">
                <span class="icon icon-link"></span>
            </a>
            {{ $static.datasetWorkPackages.title }}
        </h2>

        <div class="poster-grid">
            <img src="/images/esg/interactive_poster/section_1.svg" class="section-1" />
            <img src="/images/esg/interactive_poster/section_2.svg" class="section-2" />
            <img src="/images/esg/interactive_poster/section_3.svg" class="section-3" />
            <img src="/images/esg/interactive_poster/section_4.svg" class="section-4" />
            <img src="/images/esg/interactive_poster/section_5.svg" class="section-5" />
            <img src="/images/esg/interactive_poster/section_6.svg" class="section-6" />
            <div
                class="indicator-grid"
                :style="{
                    'grid-template-columns': getIndicatorGridCol(currentInfo.area),
                    'grid-template-rows': getIndicatorGridRow(currentInfo.area),
                }"
            >
                <div class="indicator" :class="{ hidden: currentInfo.hidden }"></div>
            </div>
            <div class="click-overlay">
                <button style="grid-area: wp-1" @click="() => onWpClick(1)"></button>
                <button style="grid-area: wp-2" @click="() => onWpClick(2)"></button>
                <button style="grid-area: wp-3-4" @click="() => onWpClick(3)"></button>
                <button style="grid-area: wp-5" @click="() => onWpClick(5)"></button>
            </div>
        </div>

        <hr />

        <b-carousel class="carousel mt-2 shadow-sm" v-model="currentInfoIndex" :interval="0" controls>
            <b-carousel-slide v-for="(info, i) in wpInfos" :key="i">
                <h3>{{ info.title }}</h3>
                <p>
                    {{ info.content }}<span v-if="info.news"> - <a :href="info.news">News</a></span>
                </p>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
export default {
    name: "EsgInteractivePoster",
    data() {
        return {
            currentInfoIndex: 0,
        };
    },
    created() {
        this.totalDimensions = {
            w: 2272 + 3454 + 445 + 433,
            h: 804 + 804 + 1346 + 655,
        };

        // area defines the coordinates of the highlighter in fractional values
        this.wpInfos = [
            {
                title: this.$static.datasetWorkPackages.summary.title,
                content: this.$static.datasetWorkPackages.summary.content,
                area: { x: 0, y: 0, w: this.totalDimensions.w, h: this.totalDimensions.h },
                hidden: true,
            },
            {
                title: this.$static.datasetWorkPackages.wp1.title,
                content: this.$static.datasetWorkPackages.wp1.content,
                area: { x: 40, y: 0, w: this.totalDimensions.w - 60, h: this.totalDimensions.h },
                news: "/projects/esg/news/?tag=esg-wp1",
            },
            {
                title: this.$static.datasetWorkPackages.wp2.title,
                content: this.$static.datasetWorkPackages.wp2.content,
                area: { x: 2310, y: 10, w: 3850, h: 770 },
                news: "/projects/esg/news/?tag=esg-wp2",
            },
            {
                title: this.$static.datasetWorkPackages.wp3.title,
                content: this.$static.datasetWorkPackages.wp3.content,
                area: { x: 2310, y: 820, w: 3850, h: 2090 },
                news: "/projects/esg/news/?tag=esg-wp3",
            },
            {
                title: this.$static.datasetWorkPackages.wp4.title,
                content: this.$static.datasetWorkPackages.wp4.content,
                area: { x: 2310, y: 820, w: 3850, h: 2090 },
                news: "/projects/esg/news/?tag=esg-wp4",
            },
            {
                title: this.$static.datasetWorkPackages.wp5.title,
                content: this.$static.datasetWorkPackages.wp5.content,
                area: { x: 40, y: 5, w: 2200, h: 1570 },
                news: "/projects/esg/news/?tag=esg-wp5",
            },
        ];
    },
    computed: {
        currentInfo() {
            return this.wpInfos[this.currentInfoIndex];
        },
    },
    methods: {
        getIndicatorGridCol(area) {
            return `${area.x}fr ${area.w}fr ${this.totalDimensions.w - (area.x + area.w)}fr`;
        },
        getIndicatorGridRow(area) {
            return `${area.y}fr ${area.h}fr ${this.totalDimensions.h - (area.y + area.h)}fr`;
        },
        onWpClick(target) {
            // special case because 3 and 4 overlap
            if (target === 3 && this.currentInfoIndex === 3) {
                this.currentInfoIndex = 4;
            } else if (target === 3 && this.currentInfoIndex === 4) {
                this.currentInfoIndex = 3;
            } else {
                this.currentInfoIndex = target;
            }
        },
    },
};
</script>

<style lang="scss">
#esg-interactive-poster {
    display: flex;
    flex-direction: column;

    h2,
    h3 {
        font-weight: 400;
    }

    .grid-template {
        display: grid;
        width: 100%;
        grid-template-columns: 2272fr 3454fr 445fr 433fr;
        grid-template-rows: 804fr 804fr 1346fr 655fr;
    }

    .poster-grid {
        position: relative;

        .section-1 {
            grid-area: s1;
        }
        .section-2 {
            grid-area: s2;
        }
        .section-3 {
            grid-area: s3;
        }
        .section-4 {
            grid-area: s4;
        }
        .section-5 {
            grid-area: s5;
        }
        .section-6 {
            grid-area: s6;
        }

        img {
            width: 100%;
            height: 100%;
        }

        @extend .grid-template;
        grid-template-areas:
            "s1 s3 s3 s6"
            "s1 s4 s4 s6"
            "s2 s4 s4 s6"
            "s2 s5 no no";
    }

    .indicator-grid {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        .indicator {
            grid-area: indi;
            border: 3px solid;
            border-color: #f1c232;
            border-radius: 0.5rem;
            box-shadow: 0 0 5px #fff12b9c;

            pointer-events: none;
            transition: border-color 0.2s;

            &.hidden {
                border-color: #f1c23200;
                box-shadow: 0 0 5px #fff12b00;
            }
        }

        display: grid;
        grid-template-areas:
            "nonA nonB nonC"
            "nonD indi nonE"
            "nonF nonG nonH";

        transition: grid-template-columns 0.2s, grid-template-rows 0.2s;
    }

    .click-overlay {
        @extend .grid-template;

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;

        grid-template-areas:
            "wp-5 nonA wp-2 wp-1"
            "wp-5 nonA wp-3-4 wp-1"
            "nonB nonA wp-3-4 wp-1"
            "nonB nonA nonC nonC";

        button {
            border: none;
            box-shadow: none;
            background-color: transparent;
            pointer-events: all;
        }
    }

    hr {
        width: 80%;
        margin: auto;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        height: 1px;
        background-color: #c5c7c9;
    }

    .carousel {
        width: 100%;
        max-width: 800px;
        align-self: center;
        border-radius: 0.5rem;
        overflow: hidden;

        h3 {
            color: black;
            font-weight: 700;
        }

        p {
            color: black;
        }

        .carousel-item {
            background-color: #f1c232;
            height: 9em;

            //bootstrap overrid
            .carousel-caption {
                left: 10%;
                right: 10%;
                bottom: unset;
            }
        }
    }
}
</style>

<static-query>
query {
    datasetWorkPackages: dataset(path: "/dataset:/projects/esg/work_packages/") {
        title,
        summary {
            title,
            content
        },
        wp1 {
            title,
            content
        },
        wp2 {
            title,
            content
        },
        wp3 {
            title,
            content
        },
        wp4 {
            title,
            content
        },
        wp5 {
            title,
            content
        },
    }
}
</static-query>
