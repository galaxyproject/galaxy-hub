<template>
    <b-button :href="link" variant="outline-primary" class="m-1 border" style="max-width: 19%">
        <h2>
            Galaxy for <b>{{ title }}</b>
        </h2>
        <b-img class="profile-button-img my-3" :src="img" fluid :alt="alt"></b-img>
    </b-button>
</template>

<script>
export default {
    props: {
        title: { type: String, required: false, default: "" },
        link: { type: String, required: false, default: "" },
        img: { type: String, required: false, default: "" },
        alt: { type: String, required: false, default: "" },
    },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles.scss";

.profile-button-img {
    max-height: 5rem;
}
</style>
