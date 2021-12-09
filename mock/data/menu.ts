export const getMenuList = function (): any {
  return {
    code: 200,
    data: [
      { name: "首页", url: "/home", icon: "" },
      { name: "地图组件", url: "/map", icon: "" },
      {
        name: "文章管理",
        url: "/article/lists",
        icon: "",
      },
    ],
    message: "请求成功",
  }
}
