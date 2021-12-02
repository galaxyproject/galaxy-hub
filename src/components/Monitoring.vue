<template>
    <div id="monitor-container">
        <h2 id="monitoring">
            SARS-CoV-2 Monitoring
        </h2>
        <a href="https://covid19.galaxyproject.org/dashboard"><img :src="'/genomics/global_platform/figs/dashboard.png'" /></a>
        <hr>
        <div id="mon-tabs">
            <!-- These can be `a` or `RouterLink`, just apply the 'action-button' class -->
            <RouterLink class="action-button" :to="'/genomics/global_platform/'">Why?</RouterLink>
            <RouterLink class="action-button" :to="'/genomics/global_platform/#workflows-for-discovery-of-sequence-variants'">Workflows</RouterLink>
            <RouterLink class="action-button" :to="'/genomics/global_platform/#processed-cog-uk-data'">Data</RouterLink>
            <RouterLink class="action-button" :to="'/genomics/global_platform/#how-do-i-use-it'">How Do I?</RouterLink>
            <a class="action-button" href="https://training.galaxyproject.org/training-material/search?query=covid19">Training</a>
        </div>
    </div>
</template>
<script>
export default {
    name: "monitoring"
};
</script>
<style lang="stylus">
#monitor-container{
    //text-align: center;
}
#monitoring{
    margin: 2rem 0;
    // border: none; // If we want the faint underline gone for this header only
}
#mon-tabs {
    display:flex;
    .action-button {
        flex: 1 1 0px
        text-align: center;
        margin: 0 1rem;
        font-size: 1.2rem;
        color: #fff;
        border: 1px solid lighten($buttonColor, 10%);
        background-color: lighten($buttonColor, 10%);
        padding: 0.8rem 1.6rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        font-weight: 500;
        &:hover {
            border: 1px solid $buttonColor;
            background-color: lighten($buttonColor, 35%);
        }
        /*
        // background-image: linear-gradient(to right, lighten($buttonColor, 15%) 0%, $buttonColor 51%, lighten($buttonColor, 15%) 100%);
        &:hover {
            background-image: linear-gradient(to right, lighten($buttonColor, 35%) 0%, $buttonColor 51%, lighten($buttonColor, 35%) 100%);
        */
    }
}
</style>
