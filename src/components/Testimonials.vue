<template>
    <div
        class="testimonial-widget"
        :class="{ compact: compact, 'has-controls': showControls }"
        @mouseenter="pauseRotation"
        @mouseleave="resumeRotation"
    >
        <!-- Optional Heading -->
        <h2 v-if="showHeading" class="testimonial-heading mb-4">{{ heading }}</h2>

        <!-- Navigation Controls -->
        <div v-if="showControls" class="testimonial-controls">
            <button
                @click="previousTestimonial"
                class="control-btn control-prev"
                aria-label="Previous testimonial"
                :disabled="allTestimonials.length <= 1"
            >
                ‹
            </button>

            <div class="testimonial-indicators">
                <button
                    v-for="(testimonial, index) in allTestimonials"
                    :key="index"
                    @click="goToTestimonial(index)"
                    class="indicator"
                    :class="{ active: index === currentIndex }"
                    :aria-label="`Go to testimonial ${index + 1}`"
                ></button>
            </div>

            <button
                @click="nextTestimonial"
                class="control-btn control-next"
                aria-label="Next testimonial"
                :disabled="allTestimonials.length <= 1"
            >
                ›
            </button>
        </div>

        <!-- Testimonial Content -->
        <div class="testimonial-content" role="region" aria-live="polite" aria-label="User testimonials">
            <transition name="fade" mode="out-in">
                <blockquote :key="currentIndex" class="blockquote text-center mb-0" :class="textColorClass">
                    <p class="quote-text" :class="quoteTextClass">{{ currentTestimonial.quote }}</p>
                    <footer
                        class="blockquote-footer"
                        :class="attributionTextClass"
                        v-if="currentTestimonial.attribution && showAttribution"
                    >
                        {{ currentTestimonial.attribution }}
                    </footer>
                </blockquote>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        testimonials: {
            type: Array,
            required: false,
            default: null,
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
            default: "white", // 'white', 'dark', or 'auto'
        },
        compact: {
            type: Boolean,
            default: false,
        },
        showControls: {
            type: Boolean,
            default: false,
        },
        showHeading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentIndex: 0,
            intervalId: null,
            isPaused: false,
        };
    },
    computed: {
        allTestimonials() {
            // Use provided testimonials prop, or fall back to GraphQL data
            return this.testimonials || (this.$static.datasetTestimonials && this.$static.datasetTestimonials.testimonials) || [];
        },
        heading() {
            return this.$static.datasetTestimonials && this.$static.datasetTestimonials.heading || "Testimonials";
        },
        currentTestimonial() {
            if (this.allTestimonials && this.allTestimonials.length > 0) {
                // Ensure currentIndex is within bounds
                const safeIndex = Math.min(this.currentIndex, this.allTestimonials.length - 1);
                const testimonial = this.allTestimonials[safeIndex];

                // Validate testimonial structure
                if (testimonial && typeof testimonial === "object") {
                    return {
                        quote: testimonial.quote || "No testimonial available.",
                        attribution: testimonial.attribution || "",
                    };
                }
            }
            return {
                quote: "Loading testimonials...",
                attribution: "",
            };
        },
        hasValidTestimonials() {
            return (
                this.allTestimonials &&
                Array.isArray(this.allTestimonials) &&
                this.allTestimonials.length > 0 &&
                this.allTestimonials.some((t) => t && t.quote)
            );
        },
        textColorClass() {
            if (this.textColor === "white") return "text-white";
            if (this.textColor === "dark") return "text-dark";
            return ""; // auto - inherit from parent
        },
        quoteTextClass() {
            const classes = ["quote-text"];
            if (this.textColor === "white") classes.push("text-white");
            if (this.textColor === "dark") classes.push("text-dark");
            return classes.join(" ");
        },
        attributionTextClass() {
            if (this.textColor === "white") return "text-white-50";
            if (this.textColor === "dark") return "text-muted";
            return "text-muted";
        },
    },
    methods: {
        nextTestimonial() {
            if (!this.hasValidTestimonials) return;
            this.currentIndex = (this.currentIndex + 1) % this.allTestimonials.length;
        },
        previousTestimonial() {
            if (!this.hasValidTestimonials) return;
            this.currentIndex = this.currentIndex === 0 ? this.allTestimonials.length - 1 : this.currentIndex - 1;
        },
        goToTestimonial(index) {
            if (index >= 0 && index < this.allTestimonials.length) {
                this.currentIndex = index;
            }
        },
        pauseRotation() {
            this.isPaused = true;
            this.stopRotation();
        },
        resumeRotation() {
            this.isPaused = false;
            this.startRotation();
        },
        startRotation() {
            if (this.autoRotate && !this.isPaused && this.hasValidTestimonials && this.allTestimonials.length > 1) {
                this.intervalId = setInterval(this.nextTestimonial, this.rotationInterval);
            }
        },
        stopRotation() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },
        validateCurrentIndex() {
            if (this.hasValidTestimonials && this.currentIndex >= this.allTestimonials.length) {
                this.currentIndex = 0;
            }
        },
    },
    mounted() {
        this.startRotation();
    },
    beforeDestroy() {
        this.stopRotation();
    },
    watch: {
        allTestimonials: {
            handler() {
                this.validateCurrentIndex();
                this.stopRotation();
                if (this.hasValidTestimonials) {
                    this.startRotation();
                }
            },
            immediate: true,
        },
    },
};
</script>

<static-query>
query {
    datasetTestimonials: dataset(path: "/dataset:/data/testimonials/") {
        heading,
        testimonials {
            quote,
            attribution
        }
    }
}
</static-query>

<style lang="scss" scoped>
@import "~/assets/styles.scss";

.testimonial-widget {
    position: relative;
    min-height: 120px; // Prevent layout shift

    .testimonial-heading {
        color: inherit;
        text-align: center;
    }

    &.compact {
        min-height: 100px;

        .quote-text {
            font-size: 0.95rem;
        }

        .blockquote-footer {
            font-size: 0.8rem;
        }

    }

    &.has-controls {
        padding-top: 40px; // Space for controls
    }
}

// Testimonial Controls
.testimonial-controls {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease;

    .testimonial-widget:hover & {
        opacity: 1;
    }
}

.control-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: inherit;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
}

.testimonial-indicators {
    display: flex;
    gap: 8px;

    .indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.5);
        background: transparent;
        cursor: pointer;
        transition: all 0.2s ease;

        &.active {
            background: rgba(255, 255, 255, 0.8);
        }

        &:hover {
            background: rgba(255, 255, 255, 0.6);
        }
    }
}

// Testimonial Content
.testimonial-content {
    position: relative;
}

.blockquote {
    border-left: none;
    margin: 0;
}


.quote-text {
    font-style: italic;
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
}

.blockquote-footer {
    font-size: 0.9rem;
    opacity: 0.8;
}

// Smooth Transitions
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

// Mobile responsive
@media (max-width: 768px) {
    .testimonial-widget.has-controls {
        padding-top: 35px;
    }

    .control-btn {
        width: 28px;
        height: 28px;
        font-size: 16px;
    }

    .quote-text {
        font-size: 1rem;
    }
}
</style>
