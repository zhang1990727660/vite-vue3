import { App } from "vue"
import VueMarkdownEditor from "@kangc/v-md-editor"
import "@kangc/v-md-editor/lib/style/base-editor.css"
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js"
// 引入使用主题的样式
import "@kangc/v-md-editor/lib/theme/style/vuepress.css"

// html预览
// import VMdPreviewHtml from "@kangc/v-md-editor/lib/preview-html"
// import "@kangc/v-md-editor/lib/style/preview-html.css"

import Prism from "prismjs"

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})

// 解析主题
export function userMDEditor(app: App) {
  app.use(VueMarkdownEditor)
  // app.use(VMdPreviewHtml)
}
