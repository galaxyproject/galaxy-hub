<template>
    <div class="container mt-4">
        <div class="row">
            <h2>Go beyond being a user</h2>
        </div>
        <div class="row">
            <div class="col-md-4 mb-3">
                <a href="/admin/" class="area beyond instance btn h-100">
                    <div class="text-white">
                        <h3>Prefer a custom instance?</h3>
                        <p>Galaxy can be installed locally, fine-tuned with a tailored toolset and no usage quotas.</p>
                    </div>
                </a>
            </div>

            <div class="col-md-8 mb-3">
                <div class="area beyond toolshed h-100">
                    <div class="text-white">
                        <h3>Need more tools?</h3>
                        <p>
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
                <a href="/community/" class="area beyond community h-100">
                    <div class="text-dark">
                        <h3 class="text-dark">Galaxy is a world-wide community.</h3>
                        <p>
                            There are over 500,000 registered Galaxy users from all over the world. Join this lively
                            community to get help, contribute, and learn.
                        </p>
                    </div>
                </a>
            </div>

            <div class="col-md-5 mb-3">
                <div class="area beyond servers bgBrightest img h-100">
                    <div class="text-dark">
                        <h3 class="text-dark">Use Galaxy servers are global!</h3>
                        <p>
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
