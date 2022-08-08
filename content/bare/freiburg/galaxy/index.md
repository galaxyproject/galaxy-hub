---
title: Galaxy Freiburg
---

<slot name="/bare/freiburg/notices" />

<slot name="/bare/freiburg/galaxy/jumbotron" />

<p style="margin-bottom: 40px"></p>

<iframe title="Recent Galaxy Freiburg posts" height="500"
 class="resize-y" src="/bare/freiburg/latest/news-events/" scrolling="no"
 style="width: 100%; border: none; vertical-align: top">
</iframe>

<div style="font-size: 125%; margin-top: 30px; margin-bottom: 30px">
<slot name="/eu/common/about-galaxy" />
</div>
<p></p>
<slot name="/eu/common/about-usegalaxy-eu" />
<p style="margin-bottom: 50px"></p>
<slot name="/freiburg/galaxy/credits" />
<p></p>
<slot name="/eu/common/training" />

<slot name="/eu/data-policy" />
<p></p>

<footer style="margin-top: 50px">
<slot name="/freiburg/credits-footer" />
</footer>

