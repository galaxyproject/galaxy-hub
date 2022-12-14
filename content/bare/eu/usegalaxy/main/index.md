---
title: Galaxy Europe
---
import Snowflakes from "@/components/Snowflakes";
<Snowflakes />

<slot name="/bare/eu/usegalaxy/notices" />

<slot name="/bare/eu/usegalaxy/main/jumbotron" />

"Anyone, anywhere in the world should have free, unhindered access to not just my research, but to the research of every great and enquiring mind across the spectrum of human understanding." – Prof. Stephen Hawking

<iframe title="Recent Galaxy Europe news" height="450"
 class="resize-y" src="/bare/eu/latest/news/" scrolling="no"
 style="width: 50%; border: none; vertical-align: top">
</iframe>
<iframe title="Recent Galaxy Europe events" height="450"
 class="resize-y" src="/bare/eu/latest/events/" scrolling="no"
 style="width: 50%; border: none; vertical-align: top">
</iframe>

<p></p>

<slot name="/eu/main1" />
<slot name="/eu/main2" />

<slot name="/eu/common/data-policy" />

<p></p>

<footer>
<slot name="/eu/site-footer" />
</footer>

import Gitter from "@/components/Gitter";
<Gitter room="usegalaxy-eu/Lobby" />
