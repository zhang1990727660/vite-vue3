import http from "@/scripts/http"

export const getMenuList = (params?: object) => {
  return http.get("/menu/list", params)
}
