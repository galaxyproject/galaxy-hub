<template>
  <footer class="footer">
    <div class="container-fluid p-0">
      <hr />
      <div class="container">
        <div class="row">
          <div class="col-md-3 align-left d-flex align-items-center mb-4">
            <img src="/images/galaxy_logo_white.svg" alt="Galaxy project logo" class="w-100 m-2" />
          </div>
          <ul class="col-md-3 text-sm-center text-md-left">
            <li><a href="/community/">Community</a></li>
            <li><a href="/community/sig/">Special Interest Groups</a></li>
            <li><a href="/gcc/">Galaxy Community Conferences</a></li>
            <li><a href="/careers/">Careers</a></li>
            <li><a href="https://jxtxfoundation.org/">JXTX Foundation</a></li>
            <li><a href="/community/coc/">Code of Conduct</a></li>
            <li><a href="mailto:contact@galaxyproject.org">Contact</a></li>
          </ul>
          <ul class="col-md-3 text-sm-center text-md-left">
            <li><a href="/community/wg/">Working Groups</a></li>
            <li><a href="https://docs.galaxyproject.org/">API documentation</a></li>
            <li><a href="/community/contributing/">Contributing</a></li>
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
            <li><a href="https://www.linkedin.com/company/galaxy-project/">LinkedIn</a></li>
            <li><a href="https://bsky.app/profile/galaxyproject.bsky.social">Bluesky</a></li>
            <li><a href="https://mstdn.science/@galaxyproject">Mastodon</a></li>
          </ul>
        </div>
        <div class="row">
          <div class="col citation">
            <p class="text-center text-muted">
              © {{ currentYear }} Galaxy Project. The Galaxy Project is supported in part by NSF, NHGRI, The Huck Institutes of the Life Sciences, The Institute for CyberScience at Penn State, Johns Hopkins University, and the Galaxy community.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  margin-top: 4rem;
  padding-bottom: 2rem;
  background-color: #f8f9fa;
}

.footer ul {
  list-style: none;
  padding: 0;
}

.footer ul li {
  margin-bottom: 0.5rem;
}

.footer a {
  color: #495057;
  text-decoration: none;
}

.footer a:hover {
  color: #007bff;
  text-decoration: underline;
}

.citation {
  margin-top: 2rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .footer ul {
    text-align: center;
    margin-bottom: 1.5rem;
  }
}
</style>