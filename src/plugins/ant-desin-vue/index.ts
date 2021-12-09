import { App } from "vue"
import { Input, Button, Menu, Pagination } from "ant-design-vue"

const plugins = [Input, Button, Menu, Pagination]

export function userAntDesignVue(app: App) {
  //   components.forEach((component: Component) => {
  //     app.component(component.name, component)
  //   })
  plugins.forEach((plugin) => {
    app.use(plugin)
  })
}
