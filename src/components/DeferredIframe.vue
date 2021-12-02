<template>
    <div class="placeholderContainer">
        <iframe v-if="loadFrame" :width="width" :height="height" frameborder="0" :src="src"></iframe>
        <!-- Shouldn't ever see this button unless the intersection API isn't available, this is a fallback -->
        <a v-else class="iframePlaceholder" href="#" @click.prevent="loadMe">
            <h3>
                Click here to load iframe
            </h3>
            <h5>{{ src }}</h5>
        </a>
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "796"
        }
    },
    data() {
        return {
            loadFrame: false
        };
    },
    mounted() {
        const observer = new IntersectionObserver(this.loadMe, {
            threshold: 1.0
        });
        observer.observe(this.$el);
    },
    methods: {
        loadMe() {
            this.loadFrame = true;
        }
    }
};
</script>
<style>
.placeholderContainer {
    width: 100%;
}
.iframePlaceholder {
    display: block;
    width: 100%;
    height: 796px;
    background: #ccc;
    text-align: center;
    padding-top: 5rem;
}
</style>
