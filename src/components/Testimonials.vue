<template>
    <div class="testimonial-widget">
        <blockquote class="blockquote text-center mb-0" :class="textColorClass">
            <p class="mb-2" :class="quoteTextClass">{{ currentTestimonial.quote }}</p>
            <footer class="blockquote-footer" :class="attributionTextClass" v-if="currentTestimonial.attribution && showAttribution">
                {{ currentTestimonial.attribution }}
            </footer>
        </blockquote>
    </div>
</template>

<script>
export default {
    props: {
        testimonials: {
            type: Array,
            required: true,
        },
        autoRotate: {
            type: Boolean,
            default: true,
        },
        rotationInterval: {
            type: Number,
            default: 20000, // 20 seconds
        },
        showAttribution: {
            type: Boolean,
            default: true,
        },
        textColor: {
            type: String,
            default: 'white', // 'white', 'dark', or 'auto'
        },
        compact: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentIndex: 0,
            intervalId: null,
        };
    },
    computed: {
        currentTestimonial() {
            if (this.testimonials && this.testimonials.length > 0) {
                return this.testimonials[this.currentIndex];
            }
            return { quote: "", attribution: "" };
        },
        textColorClass() {
            if (this.textColor === 'white') return 'text-white';
            if (this.textColor === 'dark') return 'text-dark';
            return ''; // auto - inherit from parent
        },
        quoteTextClass() {
            const baseClass = this.compact ? 'testimonial-quote-compact' : 'testimonial-quote';
            if (this.textColor === 'white') return `${baseClass} text-white`;
            if (this.textColor === 'dark') return `${baseClass} text-dark`;
            return baseClass;
        },
        attributionTextClass() {
            if (this.textColor === 'white') return 'text-white-50';
            if (this.textColor === 'dark') return 'text-muted';
            return 'text-muted';
        },
    },
    methods: {
        nextTestimonial() {
            if (this.testimonials && this.testimonials.length > 0) {
                this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
            }
        },
        startRotation() {
            if (this.autoRotate && this.testimonials && this.testimonials.length > 1) {
                this.intervalId = setInterval(this.nextTestimonial, this.rotationInterval);
            }
        },
        stopRotation() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },
        randomizeStart() {
            if (this.testimonials && this.testimonials.length > 0) {
                this.currentIndex = Math.floor(Math.random() * this.testimonials.length);
            }
        },
    },
    mounted() {
        this.randomizeStart();
        this.startRotation();
    },
    beforeDestroy() {
        this.stopRotation();
    },
    watch: {
        testimonials() {
            this.randomizeStart();
            this.stopRotation();
            this.startRotation();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles.scss";

.testimonial-widget {
    transition: opacity 0.3s ease-in-out;
}

.blockquote {
    border-left: none;
}

.testimonial-quote {
    font-style: italic;
    font-size: 1.1rem;
}

.testimonial-quote-compact {
    font-style: italic;
    font-size: 0.95rem;
}

.blockquote-footer {
    font-size: 0.9rem;
}

// Compact mode for smaller spaces
.testimonial-widget.compact {
    .blockquote {
        font-size: 0.9rem;
    }

    .blockquote-footer {
        font-size: 0.8rem;
    }
}
</style>