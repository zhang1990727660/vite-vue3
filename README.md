## 一、项目生成

1. 脚手架项目

使用脚手架，生成一个 vite-vue3 项目

```
npm init vite@latest my-vite-vue3
```

新生成目录如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d81550c7ce3643ac9c0810d785444138~tplv-k3u1fbpfcp-watermark.image?)

2. 安装依赖并启动项目

```
cd my-vite-vue3
npm i
npm run dev
```

3. 测试一下

在浏览器中成功打开，项目成功启动

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3db3956717e24d7aa0fcb5fc05ac254c~tplv-k3u1fbpfcp-watermark.image?)

## 二、配置 ESLint + Prettier

### 1. 安装 ESLint

```
npm i eslint -D
```

### 2. 初始化 ESLint

```
eslint --init
```

**PS：** 在终端执行如上命令的前提是要全局安装 ESLint，如果没有全局安装，可以在 package.json 文件中添加如下执行语句：

```
// pagckage.json
{
    "scripts": {
        "init": "eslint --init"
    }
}
```

接着会有一连串的问答选项

```
# 选择 帮我们找到不规范的语法，并强制执行
? How would you like to use ESLint? …
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style

# 选择 ES6代码规范
? What type of modules does your project use? …
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

# 选择 项目中使用的框架，我这里选择Vue.js
? Which framework does your project use? …
  React
❯ Vue.js
  None of these

# 选择 是否使用typescript 我这里选择是
Does your project use TypeScript? › No / Yes

# 选择 eslint运行的环境 浏览器 + Node
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node

# 选择 一个流行的代码规范
? How would you like to define a style for your project? …
❯ Use a popular style guide
  Answer questions about your style
  Inspect your JavaScript file(s)

# 选择 开源的配置方案选择 standard
? Which style guide do you want to follow? …
  Airbnb: https://github.com/airbnb/javascript
❯ Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo

# 选择 ESLint配置文件格式 JavaScript
? What format do you want your config file to be in? …
❯ JavaScript
  YAML
  JSON

# 是否同意安装
✔ Would you like to install them now with npm? · No / Yes

...
Successfully created .eslintrc.js file
```

执行脚本验证

```
npm run lint
```

此时控制台会报如下的错误

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e10b014eba69405ea430743c0afe4371~tplv-k3u1fbpfcp-watermark.image?)

说明 eslint 生效了，那如何解决以上来个那个问题呢？

问题 1： 'defineProps' is not defined

解决方案： 只需要在 import 中添加 defineProps 即可

```
import { ref, defineProps } from 'vue'

defineProps<{ msg: string }>()
```

问题 2： The template root requires exactly one element vue/no-multiple-template-root--template--不允许有多个根结点。这是 Vue2 的校验规范

解决方案：我们需要在.eslintrc.js 的 vue 扩展改成 Vue3 的校验规范

```
  extends: [
    'plugin:vue/vue3-essential',
  ]
```

### 3. 创建.eslintignore、.prettierrc.js、.prettierignore 文件

- 创建.eslintignore 文件，在文件中配置目录和文件，可跳过 ESLint 检查
- 创建.prettierrc.js 文件，我们可以对 prettier 的默认配置进行修改
- 创建.prettierignore 文件，在文件中配置目录和文件，可跳过 Prettier 格式化

```
// .eslintignore
/public/
/dist/
/node_modules/
package.json
.eslintrc.js

// .prettierrc.js
module.exports = {
  semi: false, // 行尾不使用分号
  singleQuote: true, // 尽量使用单引号
  trailingComma: 'all', // 对象末尾使用逗号
}

// .prettierignore
/public/
/dist/
/node_modules/
package.json
```

### 4、格式化 Vue 文件

此时打开 components/HelloWorld.vue, 修改 template 中的 div，文件中的 tempalate 部分的代码格式化不生效。说明此时 ESLint 还缺乏对 vue 文件格式化的能力(ESLint 默认只有格式化 JS 文件的能力)，因此需要安装如下的 npm 包：

```
npm i prettier -D
npm i eslint-plugin-prettier -D
npm i @vue/eslint-config-prettier -D
npm i @vue/eslint-config-typescript -D
```

在.eslintrc.js 的 extends(扩展) 中引入如上配置规则库：

```
 extends: [
    'plugin:vue/vue3-essential',
    'standard',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ]
```

**PS:** 修改后记得重启 VSCode，不然有可能不生效

## 三、配置 Stylelint

- 了解最新的 CSS 语法
- 从 HTML，markdown 和 CSS-in-JS 对象和模板文字中提取嵌入式样式
- 解析类似于 CSS 的语法，例如 SCSS，Sass，Less 和 SugarSS
- 拥有 170 多个内置规则，可捕获错误，应用限制并强制执行样式规则
- 支持插件，因此您可以创建自己的规则或使用社区编写的插件
- 自动修复大多数样式违规
- 支持可扩展或创建的可共享配置

### 1. 安装 Stylelint

```
npm i stylelint -D
npm i stylelint-config-standard -D     // 配置 Stylelint 规则
npm i stylelint-config-prettier -D     // 关闭所有不必要或可能与Prettier冲突的规则
npm i stylelint-order -D               // 控制css顺序的规则插件，我们可以在rules中通过order/properties-order传入一个css属性数组
npm i stylelint-config-recess-order -D // css顺序的配置，一份写好的配置好的属性列表，格式化时，会按这个顺序来排序
```

### 2. 新建.stylelintrc.js 文件

可以对 stylelint 的默认配置进行修改

```
module.exports = {
  root: true,
  plugins: ["stylelint-order"],
  extends: ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-recess-order"],
  rules: {
  },
}
```

### 3. 新建.stylelintignore 文件

在文件中配置的文件或目录可以绕过 stylelint 格式化

```
/dist/*
/public/*
public/*
*.js
*.ts
*.png
*.jpg
*.webp
*.ttf
*.woff
```

## 四、配置 husky + lint-staged + commitlint

### 1. 配置 husky

husky 是一种 git hook 工具，使用 husky 可以挂载 git 钩子，当我们进行 commit、push 等操作前，可以进行 eslint、stylelint 检查，如果检查没通过，则不允许 commit 或 push 操作。以及在进行 commit msg 时，验证 msg 信息是否符合规范。

husky 有如下缺陷：

- husky 会将项目的所有文件都 lint 一遍，哪怕我们只是修改了部分文件，效率低下
- husky 的钩子只能执行一个命令，有时候我们希望在 commit 之前执行多个指令，如 ESLint、Stylelint、Commitlint 等操作。
  因此，husky 一般都是配合 lint-staged 一起使用，很少会单独使用。

**1）安装 husky**

```
npm i husky -D
```

**2）在 package.json 中添加 prepare 脚本**

```
{
  "script": {
    "prepare": "husky install"
  }
}
```

**3）执行 prepare 脚本**

```
npm run prepare
```

会在项目的根目录下生成一个.husky 目录用于存放 git hooks

**4）添加 pre-commit 钩子**

在 commit 前进行 eslint、stylelint 等检查

```
npx husky add .husky/pre-commit "npm run lint"
```

执行如上命令，会在.husky 目录下新增一个 pre-commit 的 shell 脚本，该脚本的作用主要是为了执行`npm run lint`，脚本内容如下：

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
```

**测试一下**

在 main.ts 后加入`console.log`保存后，执行如下命令

```
git commmit -m 'test'
```

终端显示`ESLint`报错信息，并阻止 commit 操作，说明配置成功

**5）添加 commit-msg 钩子**

在`commit msg`时，对 msg 的内容进行规范验证，不符合规范，则不允许 commit 操作

```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

会在.husky 目录下生成 commit-msg 的 shell 脚本，脚本内容如下：

```
#!/bin/sh

"$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

需要配合下文的 commitlint 一起使用，再进行测试

### 2. 配置 lint-staged

**1）安装 lint-staged**

lint-staged 只对暂存区（通过`git add`后的）的文件进行 lint（检查），同时它允许指定不同后缀文件执行不同指令的操作，并且可以按步骤再额外的执行一些其他的 shell 指令

```
npm i lint-staged --save-dev
```

**2）在 package.json 中添加相关配置**

```
"lint-staged": {
    "*.vue": [
      "eslint --fix",
      "stylelint --fix"
    ],
    "*.{js,jsx,ts,tsx}": "eslint --fix",
    "*.{htm,html,css,sss,less,scss,sass}": "stylelint --fix"
  },"lint-staged": {
    "*.vue": [
      "eslint --fix",
      "stylelint --fix"
    ],
    "*.{js,jsx,ts,tsx}": "eslint --fix",
    "*.{htm,html,css,sss,less,scss,sass}": "stylelint --fix"
  },
```

修改 pre-commit 文件

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged --allow-empty $1
```

**测试一下**

同上执行`git commmit -m 'test'`，终端显示`ESLint`报错信息，则配置成功

### 3. 配置 commitlint

主要是为了验证`commit msg`的 msg 是否符合规范

**1）安装 commitlint 相关依赖包**

```
npm install @commitlint/cli @commitlint/config-conventional --save-dev
```

**2）新建并配置 comminlint.config.js 文件**

```
module.exports = {
  extends: ['@commitlint/config-conventional'], // 直接引入配置好的一个库，免得自己要一个一个定义
}
```

**3）按如下步骤测试一下**

1. 去掉 mian.ts 文件中的`console.log`
2. 执行`git commmit -m 'test'`，终端显示 msg 提交信息不规范，commit 操作中止，说明 comminlint 生效了
3. 按 msg 规范再提交一次，执行`git commmit -m 'fix: 修复 main.ts 文件'`，commit 提交成功

## 五、VSCode 中集成 ESLint + Prettier + Stylelint

### 1. 安装如下插件：

- Vue Language Features (Volar) Vue3.0 语法支持
- TypeScript Vue Plugin (Volar) 用于 TypeScript 服务器的 Vue 插件
- Iconify IntelliSense Iconify 预览和搜索
- ESLint 脚本代码检查
- Prettier 代码格式化
- Stylelint css 格式化
- DotENV .env 文件高亮
- EditorConfig for VS Code，这个插件可以让编译器读取配置文件，这个插件可以让编译器读取配置文件

**PS:** 我们需要禁用掉 Vetur 插件，不然会导致 Volar 插件不生效

### 2. 配置 setting.json

1. 配置工作区 setttings.json 文件

```
{
  // #每次保存的时候自动格式化
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```

2. 用户区 settings.json，在项目根目录创建.vscode/settings.json 文件。

```
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
}
```

### 3. 配置 EditorConfig 文件

在项目根目录创建.editorconfig 文件。创建完成之后，这个文件里面定义的代码规范规则会高于编译器默认的代码规范规则。

```
 root = true
 [*]
 charset = utf-8
 indent_style = space
 indent_size = 2
 insert_final_newline = true
 trim_trailing_whitespace = true
 end_of_line = auto
```

## 六、踩坑记

1. 执行`npm run lint` 时，控制台报 `Unknown word (CssSyntaxError)` 错误
   因为最新的 stylelint stylelint-config-standard 对 vue3 模版文件支持不是很好，不能正确识别出.vue 文件的 css 代码。所以需要对以下三个文件做降级处理
   ```
   "stylelint": "^13.13.1",
   "stylelint-config-standard": "^22.0.0",
   "stylelint-scss": "^3.21.0",
   ```
2. VSCode 中 stylelint 格式化不生效的问题
   同样也是要对 stylelint 做降级处理，选择 0.87.6 版本安装即可，具体操作如下

## 七、参考

- https://blog.csdn.net/weixin_45137565/article/details/120403170
- https://juejin.cn/post/7022720509875847182
- https://www.cnblogs.com/Yellow-ice/p/15127392.html
- https://www.cnblogs.com/Yellow-ice/p/15349873.html
- https://www.cnblogs.com/Yellow-ice/p/15349873.html
- https://segmentfault.com/a/1190000040615432?utm_source=sf-similar-article
- https://www.npmjs.com/package/husky
- https://typicode.github.io/husky/#/
- https://www.npmjs.com/package/lint-staged
