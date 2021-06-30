const c1 = () => import(/* webpackChunkName: "page--src--pages--events--cofests--papercuts-vue" */ "/home/dannon/work/gridhub/src/pages/events/cofests/Papercuts.vue")
const c2 = () => import(/* webpackChunkName: "page--src--pages--events--webinars-vue" */ "/home/dannon/work/gridhub/src/pages/events/Webinars.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--events--cofests-vue" */ "/home/dannon/work/gridhub/src/pages/events/Cofests.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--events--archive-vue" */ "/home/dannon/work/gridhub/src/pages/events/Archive.vue")
const c5 = () => import(/* webpackChunkName: "page--src--pages--use-vue" */ "/home/dannon/work/gridhub/src/pages/Use.vue")
const c6 = () => import(/* webpackChunkName: "page--src--pages--news-vue" */ "/home/dannon/work/gridhub/src/pages/News.vue")
const c7 = () => import(/* webpackChunkName: "page--src--pages--events-vue" */ "/home/dannon/work/gridhub/src/pages/Events.vue")
const c8 = () => import(/* webpackChunkName: "page--src--pages--careers-vue" */ "/home/dannon/work/gridhub/src/pages/Careers.vue")
const c9 = () => import(/* webpackChunkName: "page--src--pages--blog-vue" */ "/home/dannon/work/gridhub/src/pages/Blog.vue")
const c10 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/dannon/work/gridhub/node_modules/gridsome/app/pages/404.vue")
const c11 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/home/dannon/work/gridhub/src/pages/Index.vue")

export default [
  {
    path: "/events/cofests/papercuts/",
    component: c1
  },
  {
    path: "/events/webinars/",
    component: c2
  },
  {
    path: "/events/cofests/",
    component: c3
  },
  {
    path: "/events/archive/",
    component: c4
  },
  {
    path: "/use/",
    component: c5
  },
  {
    path: "/news/",
    component: c6
  },
  {
    path: "/events/",
    component: c7
  },
  {
    path: "/careers/",
    component: c8
  },
  {
    path: "/blog/",
    component: c9
  },
  {
    name: "404",
    path: "/404/",
    component: c10
  },
  {
    name: "home",
    path: "/",
    component: c11
  },
  {
    name: "*",
    path: "*",
    component: c10
  }
]
