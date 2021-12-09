import http from "@/scripts/http"

export const getArticleList = (params?: object) => {
  return http.get("/article/list", params)
}

export const getArticleDetail = (params?: object) => {
  return http.get("article/detail", params)
}
