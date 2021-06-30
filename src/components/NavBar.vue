<template>
  <nav class="container navbar navbar-expand-lg navbar-dark justify-content-center">
    <g-link to="/" class="navbar-brand">
      <img id="masthead-logo" src="/images/galaxy_logo_hub_white.svg" alt="Galaxy Community Hub" height="30">
    </g-link>
    <div id="navbarToggleWrapper" class="collapse navbar-collapse mx-auto">
      <ul class="navbar-nav">
        <li class="nav-item">
          <g-link class="nav-link dropdown" to="/use/" role="button" aria-expanded="false">
            Use
          </g-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
            Learn
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <g-link class="dropdown-item" to="/learn/">How to use Galaxy</g-link>
            </li>
            <li>
              <a class="dropdown-item" href="https://training.galaxyproject.org/">Teach with Galaxy</a>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button">
            Community
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <g-link class="dropdown-item" to="/community/">About</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/events/">Events</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/news/">News</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/blog/">Blog</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/publication-library/">Publications</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/galaxy-project/statistics/">Stats</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/careers/">Careers</g-link>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button">
            Deploy &amp; Develop
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <g-link class="dropdown-item" to="/admin/get-galaxy/">Install Galaxy</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/admin/">Server administration</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/tools/">Tools</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/develop/api/">Working with the API</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/develop/">Contributing</g-link>
            </li>
            <li>
              <g-link class="dropdown-item" to="/docs/">Code documentation</g-link>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button">
            Support
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li>
              <g-link class="dropdown-item" to="/support/">FAQ</g-link>
            </li>
            <li>
              <a class="dropdown-item" href="https://help.galaxyproject.org/">Galaxy Help Forum</a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <g-link class="nav-link dropdown" to="/jxtx/" role="button" aria-expanded="false">
            @jxtx
          </g-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");
    dropdowns.forEach(dropdown => {
      let toggle = dropdown.querySelector(".dropdown-toggle");
      let menu = dropdown.querySelector(".dropdown-menu");
      toggle.addEventListener("click", event => {
        if (menu.classList.contains("show")) {
          menu.classList.remove("show");
        } else {
          menu.classList.add("show");
        }
      });
    });
  }
}
</script>
