import Mock from "mockjs"
import { getMenuList } from "./data/menu"

const baseUrl = import.meta.env.VITE_PUBLIC_PATH

Mock.mock(`${baseUrl}menu/list`, "get", getMenuList)
