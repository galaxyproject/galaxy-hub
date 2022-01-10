<template>
    <b-button class="home-profile m-1 border" :href="link" variant="outline-primary">
        <h2>
            Galaxy for <span class="user-type">{{ title }}</span>
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

<style scoped>
.home-profile {
    max-width: 19%;
}
.user-type {
    font-weight: bolder;
}
.profile-button-img {
    max-height: 5rem;
}
</style>
