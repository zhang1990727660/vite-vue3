import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router"
// reset css
import "@/style/reset.css"
// tailwind css
import "@/style/index.css"
// use mock
import "../mock"
// 按需引入ant-design-vue
import { userAntDesignVue } from "@/plugins/ant-desin-vue"

createApp(App).use(router).use(userAntDesignVue).mount("#app")
