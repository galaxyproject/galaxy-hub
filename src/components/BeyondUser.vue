<template>
    <div class="container mt-4">
        <div class="row">
            <h2 class="gx-h2">Go beyond being a user</h2>
        </div>
        <div class="row">
            <div class="col-md-4 mb-3">
                <a href="/admin/" class="card card-home bg1 btn">
                    <div class="text-white">
                        <h3 class="title">Prefer a custom instance?</h3>
                        <p class="text">
                            Galaxy can be installed locally, fine-tuned with a tailored toolset and no usage quotas.
                        </p>
                    </div>
                </a>
            </div>

            <div class="col-md-8 mb-3">
                <div class="card card-home bg1">
                    <div class="text-white">
                        <h3 class="title">Need more tools?</h3>
                        <p class="text">
                            The Galaxy ToolShed is a repository of thousands tools that have been integrated with
                            Galaxy, and you can add your own.
                        </p>
                        <div class="float-right">
                            <a href="/tools/" class="btn btn-lg btn-outline-light mr-3">Add tools</a>
                            <a href="/toolshed/" class="btn btn-lg btn-info">Browse ToolShed</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-7 mb-3">
                <a href="/community/" class="card card-home bg2">
                    <div class="text-dark">
                        <h3 class="title">Galaxy is a world-wide community.</h3>
                        <p class="text">
                            There are over 500,000 registered Galaxy users from all over the world. Join this lively
                            community to get help, contribute, and learn.
                        </p>
                    </div>
                </a>
            </div>

            <div class="col-md-5 mb-3">
                <div class="card card-home bg3 img">
                    <div class="text-dark">
                        <h3 class="title">Use Galaxy servers are global!</h3>
                        <p class="text">
                            There are over a hundred public and free Galaxy servers available.<br />
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
    name: "BeyondUser",
};
</script>

<style scoped>
.gx-h2 {
    font-size: 3rem;
    font-weight: 700;
    color: white;
}

.card-home {
    text-align: left;
    padding: 20px;
    text-decoration: none !important;
    min-height: 15rem;
    border-radius: 20px;
    &:hover {
        text-decoration: none !important;
    }

    &.bg1 {
        background-color: #0e1427;
        &.btn:hover {
            background-color: #1b264b;
        }
    }

    &.bg2 {
        background-color: #00a7e1;
        &:hover {
            background-color: #00b8f5;
        }
    }

    &.bg3 {
        background-color: #76ffff;
        position: relative;

        &::before,
        &:before {
            content: "";
            pointer-events: none;
            display: block;
            width: 90%;
            height: 100%;
            position: absolute;
            background-image: url("/images/icons/worldMap.svg");
            opacity: 0.05;
            background-size: cover;
            background-position: 0 -200%;
        }
    }

    .title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
    }

    .text {
        font-size: 1.5rem;
        font-weight: 400;
        padding-left: 0;
        line-height: 1.6;
    }
}
</style>
