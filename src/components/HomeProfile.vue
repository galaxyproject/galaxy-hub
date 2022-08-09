<template>
    <b-button class="home-profile border" :href="link" variant="outline-primary">
        <div class="d-flex flex-column justify-content-between wrapper">
            <div class="top">
                <h2 class="text mb-0">
                    Galaxy for <br />
                    <span class="user-type">{{ title }}</span>
                </h2>
            </div>
            <b-img class="profile-button-img my-3" :src="img" fluid :alt="alt"></b-img>
        </div>
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
.wrapper {
    height: 100%;
}
.home-profile {
    width: 13rem;
    margin: 0.6rem;
}
.user-type {
    font-weight: bolder;
}
.profile-button-img {
    max-height: 5rem;
}
</style>
