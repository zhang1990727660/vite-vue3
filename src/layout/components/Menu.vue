<script setup lang="ts">
import { ref, Ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getMenuList } from "@/api/menu"

type Menu = {
  name: string
  url: string
  icon: string
  children?: Menu[]
}

const defaultMenu: Menu[] = [
  { name: "首页", url: "/home", icon: "" },
  { name: "地图组件", url: "/map", icon: "" },
  {
    name: "文章管理",
    url: "/article/lists",
    icon: "",
  },
]

const router = useRouter()
const menuList: Ref<Menu[]> = ref()
const activeMenu = ref()

// 菜单列表信息
const fetchData = async function () {
  const [err, data]: any = await getMenuList()
  if (!err) {
    menuList.value = data || defaultMenu
    activeMenu.value = menuList.value[0]
  }
}
onMounted(() => {
  fetchData()
})

// 菜单点击跳转
function hanldeGo(menu: Menu) {
  activeMenu.value = menu
  router.push(menu.url)
}
</script>

<template>
  <ul class="menu">
    <li
      :class="['menu-item', activeMenu.url === menu.url && 'active']"
      @click="hanldeGo(menu)"
      v-for="menu in menuList"
      :key="menu.name"
    >
      {{ menu.name }}
    </li>
  </ul>
</template>

<style scoped lang="less">
.menu {
  width: 200px;
  height: 100%;
  padding: 10px 0;
  color: #fff;
  background: #000;

  &-item {
    height: 38px;
    padding: 0 20px;
    line-height: 38px;
    text-align: left;
    cursor: pointer;

    &.active,
    &:hover {
      background: rgb(48, 46, 46);
    }
  }
}
</style>
