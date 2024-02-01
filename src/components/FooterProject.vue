<template>
    <div class="footer">
        <div class="container-fluid-real p-0">
            <hr />
            <div class="container">
                <div class="row">
                    <div class="col-md-3 align-left d-flex align-items-center mb-4">
                        <img src="/images/galaxy_logo_white.svg" alt="Galaxy project logo" class="w-100 m-2" />
                    </div>
                    <ul class="col-md-3 text-sm-center text-md-left">
                        <li><a href="/community/">Community</a></li>
                        <li><a href="/community/practice/">Communities of Practice</a></li>
                        <li><a href="/core-team/">Galaxy Core Team</a></li>
                        <li><a href="/careers/">Careers</a></li>
                        <li><a href="https://jxtxfoundation.org/">@jxtx</a></li>
                        <li><a href="/community/coc/">Code of Conduct</a></li>
                    </ul>
                    <ul class="col-md-3 text-sm-center text-md-left">
                        <li><a href="https://docs.galaxyproject.org/">API documentation</a></li>
                        <li><a href="/community/contributing/">Contributing</a></li>
                        <li><a href="/gcc/">Galaxy Community Conferences</a></li>
                        <li><a href="/images/galaxy-logos/">Branding and logos</a></li>
                    </ul>
                    <ul class="col-md-2 text-sm-center text-md-left">
                        <li><a href="https://bioblend.readthedocs.io/">BioBlend</a></li>
                        <li><a href="https://ephemeris.readthedocs.io/">Ephemeris</a></li>
                        <li><a href="https://planemo.readthedocs.io/">Planemo</a></li>
                        <li><a href="https://pulsar.readthedocs.io/">Pulsar</a></li>
                        <li><a href="https://total-perspective-vortex.readthedocs.io/">TPV</a></li>
                    </ul>
                    <ul class="col-md-1 text-sm-center text-md-left">
                        <li><a href="https://github.com/galaxyproject/">GitHub</a></li>
                        <li><a href="https://matrix.to/#/#galaxyproject_Lobby:gitter.im">Matrix</a></li>
                        <li><a href="https://www.youtube.com/@GalaxyProject">YouTube</a></li>
                        <li><a href="https://mstdn.science/@galaxyproject">Mastodon</a></li>
                        <li><a href="https://www.linkedin.com/groups/4907635/">LinkedIn</a></li>
                    </ul>
                </div>
                <div class="row">
                    <div v-html="citation" class="col citation" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FooterProject",
    props: {
        citation: { type: String, required: true, default: "" },
    },
};
</script>
