import Mock from "mockjs"
import { getMenuList } from "./data/menu"
import { getArticleList, getArticleDetail } from "./data/article"

const baseUrl = import.meta.env.VITE_PUBLIC_PATH

Mock.mock(`${baseUrl}menu/list`, "get", getMenuList)
Mock.mock(`${baseUrl}article/list`, "get", getArticleList)
Mock.mock(`${baseUrl}article/detail`, "get", getArticleDetail)
