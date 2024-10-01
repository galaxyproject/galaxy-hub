<template>
    <iframe
        allowfullscreen
        sandbox="allow-top-navigation allow-scripts allow-popups allow-popups-to-escape-sandbox"
        height="100%"
        :src="`https://mastofeed.com/apiv2/feed?userurl=https%3A%2F%2F${instanceUrl}%2Fusers%2F${username}&theme=auto&size=100&header=true&replies=true&boosts=true`"
    />
</template>

<script>
export default {
    props: {
        instanceUrl: {
            type: String,
            default: "mstdn.science",
        },
        username: {
            type: String,
            default: "galaxyproject",
        },
    },
};
</script>
