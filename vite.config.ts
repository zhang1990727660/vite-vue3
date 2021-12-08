import { resolve } from "path"
import { UserConfigExport, ConfigEnv, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import styleImport, { AndDesignVueResolve } from "vite-plugin-style-import"
import { warpperEnv } from "./src/scripts/utils"

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir)
}

const root: string = process.cwd()

// 设置别名
const alias: Record<string, string> = {
  "@": pathResolve("./src/"),
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  // const env = loadEnv(mode, root)
  // const { VITE_PUBLIC_PATH, VITE_PROXY } = warpperEnv(env)
  return {
    // server: {
    //   proxy: {
    //     [VITE_PUBLIC_PATH]: {
    //       target: VITE_PROXY,
    //     },
    //   },
    // },
    resolve: {
      alias,
    },
    css: {
      preprocessorOptions: {
        less: {
          // 全局引入less变量
          additionalData: `@import "${pathResolve("src/style/vars.less")}";`,
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      styleImport({
        resolves: [AndDesignVueResolve()],
      }),
      vue(),
    ],
  }
}
