<template>
    <div id="monitor-container">
        <h2 id="monitoring">SARS-CoV-2 Monitoring</h2>
        <a href="https://covid19.galaxyproject.org/dashboard/">
            <g-image src="/images/covid19/dashboard.png" />
        </a>
        <hr />
        <div id="mon-tabs">
            <g-link class="action-button" to="/covid19/genomics/global-platform/">Why?</g-link>
            <g-link
                class="action-button"
                to="/covid19/genomics/global-platform/#workflows-for-discovery-of-sequence-variants"
            >
                Workflows
            </g-link>
            <g-link class="action-button" to="/covid19/genomics/global-platform/#processed-cog-uk-data">Data</g-link>
            <g-link class="action-button" to="/covid19/genomics/global-platform/#how-do-i-use-it">How Do I?</g-link>
            <a class="action-button" href="https://training.galaxyproject.org/training-material/search?query=covid19">
                Training
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Monitoring",
};
</script>

<style lang="stylus">
@require '../assets/palette.styl';

#monitor-container {
    //text-align: center;
}
#monitoring {
    margin: 2rem 0;
    // border: none; // If we want the faint underline gone for this header only
}
#mon-tabs {
    display:flex;
    a.action-button {
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
