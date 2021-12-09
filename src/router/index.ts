import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Root",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/map",
        name: "map",
        component: () => import("@/views/Map.vue"),
      },
      {
        path: "/article",
        name: "article",
        component: () => import("@/views/Article/index.vue"),
        redirect: "/article/lists",
        children: [
          {
            path: "lists",
            name: "lists",
            component: () => import("@/views/Article/children/lists/index.vue"),
          },
          {
            path: "editor",
            name: "editor",
            component: () => import("@/views/Article/children/Editor.vue"),
          },
          {
            path: "detail",
            name: "detail",
            component: () => import("@/views/Article/children/Detail.vue"),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
