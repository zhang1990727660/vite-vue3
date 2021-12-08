import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"
import Home from "@/views/Home.vue"
import Test from "@/views/Test.vue"
import Map from "@/views/Map.vue"

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
        component: Home,
      },
      {
        path: "/test",
        name: "test",
        component: Test,
      },
      {
        path: "/map",
        name: "map",
        component: Map,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
