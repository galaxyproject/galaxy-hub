---
title: Galaxy France
---

<slot name="/bare/fr/usegalaxy/notices" />

<slot name="/ifb/lead1" />
<slot name="/ifb/lead2" />

<Carousel />

<br/>

<iframe title="Recent Galaxy France news" height="450"
 class="resize-y" src="/bare/fr/latest/news/" scrolling="no"
 style="width: 50%; border: none; vertical-align: top">
</iframe>
<iframe title="Recent Galaxy France events" height="450"
 class="resize-y" src="/bare/fr/latest/events/" scrolling="no"
 style="width: 50%; border: none; vertical-align: top">
</iframe>

<p></p>
<slot name="/ifb/main1" />
<slot name="/ifb/main2" />
<slot name="/ifb/main3" />

<p></p>

<footer>
<slot name="/ifb/site-footer" />
</footer>
