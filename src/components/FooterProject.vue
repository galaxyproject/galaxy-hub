<template>
  <div class="sectionFooter">
    <div class="container-fluid-real p-0">
        <hr />
        <div class="container">
            <div class="row">
                <div class="col-md-3 center">
                    <img id="footer-logo" src="/images/galaxy_logo_white.svg" alt="Galaxy project logo" height="60" style="margin-top: 2rem;" />
                </div>
                <ul class="col-md-3 footer-items">
                    <li><a href="/community/">Community</a></li>
                    <li><a href="/community/practice/">Communities of Practice</a></li>
                    <li><a href="/core-team/">Galaxy Core Team</a></li>
                    <li><a href="/careers/">Careers</a></li>
                    <li><a href="https://jxtxfoundation.org/">@jxtx</a></li>
                    <li><a href="/community/coc/">Code of Conduct</a></li>
                </ul>
                <ul class="col-md-2 footer-items">
                    <li><a href="https://docs.galaxyproject.org/">API documentation</a></li>
                    <li><a href="/community/contributing/">Contributing</a></li>
                    <li><a href="/gcc/">Galaxy Community Conferences</a></li>
                    <li><a href="/images/galaxy-logos/">Branding and logos</a></li>
                </ul>
                <div id="ecosystem-items" class="col-md-2 footer-items">
                    <li><a href="https://bioblend.readthedocs.io/">BioBlend</a></li>
                    <li><a href="https://ephemeris.readthedocs.io/">Ephemeris</a></li>
                    <li><a href="https://planemo.readthedocs.io/">Planemo</a></li>
                    <li><a href="https://pulsar.readthedocs.io/">Pulsar</a></li>
                    <li><a href="https://total-perspective-vortex.readthedocs.io/">TPV</a></li>
                </div>
                <div id="social-items" class="col-md-2 footer-items">
                    <li><a href="https://github.com/galaxyproject/">GitHub</a></li>
                    <li><a href="https://matrix.to/#/#galaxyproject_Lobby:gitter.im">Matrix</a></li>
                    <li><a href="https://www.youtube.com/@GalaxyProject">YouTube</a></li>
                    <li><a href="https://mstdn.science/@galaxyproject">Mastodon</a></li>
                    <li><a href="https://www.linkedin.com/groups/4907635/">LinkedIn</a></li>
                </div>
            </div>
            <div class="row">
                <p style="font-size: 0.7rem; color: #A5A5A5;">
                    <i>usegalaxy.org</i> is supported by NIH and NSF Grants HG006620,
                    1661497, and 1929694. <i>usegalaxy.eu</i> is supported by the
                    German Federal Ministry of Education and Research grant
                    031L0101C and de.NBI-epi. <i>usegalaxy.org.au</i> is supported by
                    Bioplatforms Australia and the Australian Research Data Commons.
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'FooterProject',
}
</script>

<style lang="scss" scoped>
.sectionFooter {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    hr {
        background-color: white;
        height: 1px;
        margin: 0 0 40px 0;
    }
}

.footer-items {
    color: white;
    font-size: 0.9rem;
    list-style-type: none;
    padding: 0;
}

.footer-items a {
    color: white;
}
</style>
