---
title: GCC2019 will be livestreamed
date: '2019-06-30'
tags: [talk, video, GCC]
authors: hexylena
authors_structured:
- github: hexylena
subsites: [eu, freiburg]
main_subsite: freiburg
---

This year's GCC is live streamed! If you couldn't make it to Germany, come check out some of the talks and trainings taking place in Freiburg this week.

<script type="text/javascript" src="https://content.jwplatform.com/libraries/POjuZXXt.js"></script>

<div class="row">
	<div class="col-sm-6 col-xs-12">
		<div id="mobilemz"></div>
	</div>
	<div class="col-sm-6 col-xs-12">
		<div id="mobilerz"></div>
	</div>
</div>

<script type="text/javascript">
jwplayer("mobilemz").setup({
	width: "100%",
	aspectratio: "16:9",
	image: "https://www.streaming.uni-freiburg.de/Bilder/playerbackground.jpg",
	sources: [{
				file: "https://wowza.ub.uni-freiburg.de/live/smil:mobilemz.smil/playlist.m3u8"
			}, {
				file: "rtmps://wowza.ub.uni-freiburg.de/live/smil:mobilemz.smil"
			}, {
				file: "rtmp://wowza.ub.uni-freiburg.de:1935/live/mobilemz"
			}],
	rtmp: {
		bufferlength: 0.3
	},
	proxyType: "best"
});

jwplayer("mobilerz").setup({
	width: "100%",
	aspectratio: "16:9",
	image: "https://www.streaming.uni-freiburg.de/Bilder/playerbackground.jpg",
	sources: [{
				file: "https://wowza.ub.uni-freiburg.de/live/smil:mobilerz.smil/playlist.m3u8"
			}, {
				file: "rtmps://wowza.ub.uni-freiburg.de/live/smil:mobilerz.smil"
			}, {
				file: "rtmp://wowza.ub.uni-freiburg.de:1935/live/mobilerz"
			}],
	rtmp: {
		bufferlength: 0.3
	},
	proxyType: "best"
});
</script>

