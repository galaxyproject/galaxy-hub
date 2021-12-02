<template
    ><div v-show="false">
        <a :href="link">{{ this.message }}</a>
    </div>
</template>
<script>
import Toasted from "vue-toasted";
import Vue from "vue";
Vue.use(Toasted, { keepOnHover: true });

export default {
    data() {
        return {
            message: "Join our COVID-19 webinars and learn about data analysis in Galaxy.",
            link: "https://elixir-europe.org/events/webinar-galaxy-elixir-covid19"
        };
    },
    mounted() {
        this.$toasted.show(this.message, {
            theme: "toasted-primary",
            duration: 10000,
            position: "bottom-right",
            action: [
                {
                    text: "more info",
                    onClick: (e, toastObject) => {
                        window.open(this.link);
                        toastObject.goAway(0);
                    }
                },
                {
                    text: "dismiss",
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                }
            ]
        });
    }
};
</script>
