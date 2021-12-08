// interface Menu {
//   name: string
//   url: string
//   icon: string
// }
export const getMenuList = function (): any {
  return {
    code: 200,
    data: [
      { name: "home", url: "/home", icon: "" },
      { name: "test", url: "/test", icon: "" },
      { name: "map", url: "/map", icon: "" },
    ],
    message: "请求成功",
  }
}
