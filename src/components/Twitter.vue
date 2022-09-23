<template>
    <div :class="['outer', ...outerClasses]">
        <div class="inner" :style="innerStyle">
            <Tweet
                v-if="tweet"
                :id="tweet"
                :options="computedOptions"
                error-message="This tweet could not be loaded."
            ></Tweet>
            <Timeline
                v-else-if="user"
                :id="user"
                :options="computedOptions"
                source-type="profile"
                error-message="This Twitter feed could not be loaded."
            ></Timeline>
        </div>
    </div>
</template>

<script>
import { Tweet, Timeline } from "vue-tweet-embed";
/** Convenience wrapper for vue-tweet-embed's components.
 * This provides one component for both tweets and timelines and prevents the user from having to
 * repeat the wrapper HTML that allows centering.
 */
export default {
    components: {
        Tweet,
        Timeline,
    },
    props: {
        /** The id of the tweet to display. There is no need to provide the `user` as well. */
        tweet: { type: String, required: false, default: "" },
        /** The username of the timeline to display. */
        user: { type: String, required: false, default: "" },
        height: { type: Number, required: false, default: 810 },
        width: { type: Number, required: false, default: 550 },
        center: { type: Boolean, required: false, default: true },
        /** Extra options to be passed directly to the underlying Tweet or Timeline component. */
        options: { type: Object, required: false, default: () => ({}) },
    },
    computed: {
        outerClasses() {
            let classes = [];
            if (this.center) {
                classes.push("centered");
            }
            return classes;
        },
        innerStyle() {
            if (this.center) {
                return `width: ${this.width}px`;
            } else {
                return "";
            }
        },
        computedOptions() {
            let options = {
                height: this.height,
                width: this.width,
            };
            Object.assign(options, this.options);
            return options;
        },
    },
    created() {
        if (!(this.tweet || this.user)) {
            throw "Either a tweet or user must be provided to Twitter component.";
        }
    },
};
</script>

<style scoped>
.centered.outer {
    text-align: center;
}
.centered > .inner {
    display: inline-block;
    max-width: 100%;
}
</style>
