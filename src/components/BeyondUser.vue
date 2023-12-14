<template>
    <div class="container mt-4">
        <div class="row">
          <h2 class="gx-h2">Go beyond being a user</h2>
        </div>
        <div class="row">
            <div class="col-md-4 mb-3">
                <a href="/admin/" class="card card-btn bu-card bu-card-bg1 bu-card-bg1-btn text-white">
                    <div class="card-body">
                        <h3 class="card-title">Prefer a custom instance?</h3>
                        <p class="card-text">Galaxy can be installed locally, fine-tuned with a tailored toolset and no
                            usage quotas.</p>
                    </div>
                </a>
            </div>

            <div class="col-md-8 mb-3">
                <div class="card bu-card bu-card-bg1 text-white">
                    <div class="card-body">
                        <h3 class="card-title">Need more tools?</h3>
                        <p class="card-text">The Galaxy ToolShed is a repository of thousands tools that have been
                            integrated with Galaxy, and you can add your own.</p>
                        <div class="float-right" style="position: absolute; bottom: 0; right: 1rem;">
                          <a href="/tools/" class="btn btn-outline-light mr-3">Add tools</a>
                          <a href="/toolshed/" class="btn btn-info">Browse ToolShed</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 mb-3">
                <a href="/community/" class="card card-btn bu-card bu-card-bg2 text-white">
                    <div class="card-body">
                        <h3 class="card-title">Galaxy is a world-wide community.</h3>
                        <p class="card-text">There are over 500,000 registered Galaxy users from all over the world. Join
                            this lively community to get help, contribute, and learn.</p>
                        </div>
                </a>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card bu-card bu-card-bg3">
                    <div class="card-body">
                        <h3 class="card-title">Use Galaxy servers are global!</h3>
                        <p class="card-text">There are over a hundred public and free Galaxy servers available.
                          <a href="/use/">Find yours.</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BeyondUser',
}
</script>

<style scoped>

.gx-h2 {
  font-size: 3rem;
  font-weight: 700;
}
.card-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.card-btn, .card-btn:hover {
  text-decoration: none !important;
}

.card-text {
  font-size: 1.2rem;
  padding-left: 0;
}

.bu-card {
  min-height: 15rem;
  border-radius: 20px;
}

.bu-card-bg1 {
  background-color: #0E1427;
}

.bu-card-bg1-btn:hover {
  background-color: #1B264B;
}

.bu-card-bg2 {
  background-color: #00A7E1;
}

.bu-card-bg2:hover {
  background-color: #00B8F5;
}

.bu-card-bg3 {
  background-color: #76FFFF;
}
</style>
