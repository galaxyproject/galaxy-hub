<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :width="combinedWidth"
        height="20"
        :alt="alt"
    >
        <linearGradient :id="smooth" x2="0" y2="100%">
            <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
            <stop offset="1" stop-opacity=".1" />
        </linearGradient>

        <clipPath :id="clipPath">
            <rect :width="combinedWidth" height="20" rx="3" fill="#fff" />
        </clipPath>

        <g :clip-path="urlClipPath">
            <rect :width="leftWidth" height="20" :fill="getFill" />
            <rect :x="leftWidth" :width="rightWidth" height="20" :fill="rightColorParsed" />
            <rect :width="combinedWidth" height="20" :fill="urlSmooth" />
        </g>

        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
            <!-- left text -->
            <text
                :x="ltX"
                y="150"
                fill="#010101"
                fill-opacity=".3"
                transform="scale(0.1)"
                :textLength="ltLength"
                lengthAdjust="spacing"
            >
                {{ label }}
            </text>
            <text :x="ltX" y="140" transform="scale(0.1)" :textLength="ltLength" lengthAdjust="spacing">
                {{ label }}
            </text>

            <!-- right text -->
            <text
                :x="rtX"
                y="150"
                fill="#010101"
                fill-opacity=".3"
                transform="scale(0.1)"
                :textLength="rtLength"
                lengthAdjust="spacing"
            >
                {{ message }}
            </text>
            <text :x="rtX" y="140" transform="scale(0.1)" :textLength="rtLength" lengthAdjust="spacing">
                {{ message }}
            </text>
        </g>
        <a v-if="href" target="_blank" :xlink:href="href">
            <rect :width="combinedWidth" height="20" fill="rgba(0,0,0,0)" />
        </a>
    </svg>
</template>

<script>
/*
This is an adaptation of github.com/badges/shields, converting the flat
template to an SVG-Generating vue component
*/
import { v4 as uuidv4 } from "uuid";
import { ana } from "./ana.js";
import { normalizeColor, toSvgColor } from "gh-badges/lib/color";

export default {
    data() {
        return {
            clipPath: "",
            smooth: ""
        };
    },
    props: {
        label: {
            type: String,
            default: ""
        },
        message: {
            type: String,
            default: ""
        },
        href: {
            type: String,
            default: ""
        },
        leftColor: {
            type: String
        },
        rightColor: {
            type: String
        },
        color: {
            type: String
        },
        alt: {
            type: String
        }
    },
    computed: {
        leftColorParsed() {
            return toSvgColor(normalizeColor(this.leftColor));
        },
        rightColorParsed() {
            return toSvgColor(normalizeColor(this.rightColor || this.color)) || "#4c1";
        },
        leftWidth() {
            let leftWidth = (ana.widthOf(this.label) / 10) | 0;
            // Increase chances of pixel grid alignment.
            if (leftWidth % 2 === 0) {
                leftWidth++;
            }
            return leftWidth + 10;
        },
        rightWidth() {
            let rightWidth = (ana.widthOf(this.message) / 10) | 0;
            // Increase chances of pixel grid alignment.
            if (rightWidth % 2 === 0) {
                rightWidth++;
            }
            return rightWidth + 10;
        },
        ltX() {
            return (this.leftWidth / 2 + 1) * 10;
        },
        ltLength() {
            return (this.leftWidth - 10) * 10;
        },
        rtX() {
            return (this.leftWidth + this.rightWidth / 2 - 1) * 10;
        },
        rtLength() {
            return (this.rightWidth - 10) * 10;
        },
        getFill() {
            return this.label.length ? this.leftColorParsed || "#555" : this.rightColorParsed || "#4c1";
        },
        combinedWidth() {
            return this.leftWidth + this.rightWidth;
        },
        urlSmooth() {
            return `url(#${this.smooth})`;
        },
        urlClipPath() {
            return `url(#${this.clipPath})`;
        }
    },
    mounted() {
        this.clipPath = uuidv4();
        this.smooth = uuidv4();
    }
};
</script>
