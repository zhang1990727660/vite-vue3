## 一、ESlint 配置详解

ESlint 是一款插件化的 JavaScript 代码静态检查工具，其核心是通过对代码解析得到的 AST（Abstract Syntax Tree，抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力。

ESlint 相关的依赖安装后，我们还可以选择开源的配置方案，如 eslint-config-airbnb 或 eslint-config-standard。也可以根据个人或团队的代码风格进行配置。配置完成之后，就可以通过命令行工具或借助编辑器集成的 ESLint 功能对工程代码进行静态检查，发现和修复不符合规范的代码，ESLint 提供的 auto-fix 能力也能够帮助我们自动修复一些代码格式问题。

**具体配置文件详解**

### 1. root

ESLint 默认会一直往上寻找配置文件直到根目录，一旦在某一级发现配置文件配置了 root 参数并且设置为 true，ESLint 就会停止往上一级寻找，所有这些配置文件的规则会被层叠应用。若有重复的属性配置，则离文件更近的的配置文件的具有更高的优先级

**PS:** 如果项目目录下有多个配置文件，ESLint 只会使用一个，优先级为：.eslintrc.js > .eslintrcs > package.json

### 2. env 执行环境

指定脚本的运行环境，每种环境都有一组特定的预定义全局变量

举个例子：

```
 env: {
   node: true,
   browser: true,
   es6: false
 }
```

如上配置 es6 为 false，如果代码中出现 let、const 等关键字，ESLint 检查就会报错。再例如 browser 为 true，代表该脚本运行在浏览器的环境下，代码中出现 window 就不会报错，如果 browser 设置为 false，

### 3. globals 全局变量

脚本在执行期间访问的额外全局变量

```
 globals: {
   $: true
   jquery: true
 }
```

### 4. parserOptions 解析器选项

ESLint 默认支持 ECMAScript5 语法，我们可以通过该配置指定 ECMAScriipt 版本和 JSX 的支持，parserOptions 可用的选项如下：

- ecmaVersion，指定我们要使用的 ECMAScript 的版本, 如 3、5(默认)、6、7、8、9、10
- sourceType，设置为 script（默认），或 module（如果你的代码在 ECMAScript 模块中）。
- ecmaFeatures，表示我们想使用的额外的语言特性
  - globalReturn，允许在全局作用域下使用 return 语句
  - impliedStrict，启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
  - jsx，启用 JSX
  - experimentalObjectRestSpread，不建议使用

```
 parserOptions: {
     ecmaVersion: 6,
     sourceType: "module",
     ecmaFeatures: {
         "jsx": true
     }
 },
```

### 5. parser 解析器

首先我们先看看什么是解析器？
我的理解是，即告诉 ESLint 我要对某种类型的语言来进行校验，ESLint 默认只会对 ECMAScript 语言进行校验，比方说，如果我们需要校验 TypeScript 语言，那么就需要安装对应的@typescript-eslint/parser 解析器。并配置对应的 parserOptions 解析器选项，一般 parser 与 parserOptions 需要同时使用。

parser 的作用是指定要使用的解析器，ESLint 默认使用 Espree 作为其解析器
常见的解析器有如下：

- esprima
- @babel/eslint-parser：
- @typescript-eslint/parser：将 TypeScript 转换成与 estree 兼容的形式，以便在 ESLint 中使用
- vue-eslint-parser

### 6. processor

指定插件的处理器（需要和 plugins 字段配合使用），
处理器的作用

- 它是能从其它文件中(非 JavaScript 文件)提取 JavaScript 代码，并让 eslint 检查这些 Javascript 代码的规范
- 在预处理的过程中，如果需要对 JavaScript 进行某些转换，可以使用处理器

示例 1: 启用插件 a-plugin 提供的处理器 a-processor

```
 {
  "plugins": ["a-plugin"],
  "processor": "a-plugin/a-processor"
 }
```

示例 2: 为特定类型的文件指定处理器

```
{
 "plugins": ["a-plugin"],
 "overrides":[{
   "files": ["*.md"],
   "processor": "a-plugin/markdown"
 }]
}
```

### 7. plugins 插件

ESLint 支持使用第三方插件，在使用之前，必须使用 npm 安装它，引入时，esline-plugin- 部分可以省略。

plugins 的主要作用是什么呢？
插件的作用，通常都是用来增强一款框架的能力，这里也就是增强 ESLint 的能力。可以理解为 plugins 就是在 ESLint 常规检查 JS 代码规范这个能力之外，给它增加一些新的能力。举一下两个例子：

示例 1: eslint-plugin-prettier 这个插件，就是用来把 prettier 的能力赋给 ESLint,即让 ESLint 也拥有 prettier 一样拥有格式化代码的能力。

```
// 安装
npm i eslint-plugin-prettier -D

// 在.eslintrc.js中使用
{
  plugins: ['prettier']
}
```

示例 2: 在项目中使用 TypeScript，首先需要将解析器改为@typescript-eslint/parser，同时需要安装@typescript-eslint/eslint-plugin 插件来拓展规则，添加的 plugins 中的规则默认是不开启的，因此我们需要在 rules 中使用，也就是 plugins 要和 rules 结合使用，或直接通过 extends 中引入插件的拓展。

```
 // npm i --save-dev @typescript-eslint/eslint-plugin    // 注册插件
 {
   "parser": "@typescript-eslint/parser",
   "plugins": ["@typescript-eslint"],   // 引入插件
   "rules": {
     "@typescript-eslint/rule-name": "error"    // 使用插件规则
     '@typescript-eslint/adjacent-overload-signatures': 'error',
     '@typescript-eslint/ban-ts-comment': 'error',
     '@typescript-eslint/ban-types': 'error',
     '@typescript-eslint/explicit-module-boundary-types': 'warn',
     '@typescript-eslint/no-array-constructor': 'error',
     'no-empty-function': 'off',
     '@typescript-eslint/no-empty-function': 'error',
     '@typescript-eslint/no-empty-interface': 'error',
     '@typescript-eslint/no-explicit-any': 'warn',
     '@typescript-eslint/no-extra-non-null-assertion': 'error',
     ...
   }
 }
```

或者使用 extends 中引入

```
  {
    "extends": [
        "eslint:recommended", // 官方拓展
        "plugin:@typescript-eslint/recommended", // 插件拓展
        "standard", // npm包，开源社区流行的配置方案，比如：eslint-config-airbnb、eslint-config-standard
    ],
  }
```

### 8. extends 扩展

用于继承某些基础配置。值可以是字符串/数组。值为数组时，每个配置继承它前面的配置。说白了，就是别人提前写好了一套 rules，你直接拿过来用就行。不用自己一个一个的写 rules 规则，要是有不符合自己心意的规则，就手写 rules，覆盖掉基础配置项（如：eslint:recommended）就好啦！

### 9. rules 规则配置

....

## 二、ESLint + Prettier 使用

安装 ESlint、Prettier 常见的有脚手架自动安装，和手动安装，这里主要讲解如果已经存在一个项目，想要引入 ESLint 与 Prettie

### 1. 安装 ESLint

```
npm i eslint -D
```

### 2. ESlint 初始化配置，生成如.eslintrc.js 文件

```
eslint --init
```

### 3. 创建.eslintignore 文件

在项目的根目录下创建.eslintignore 文件，在该文件中添加需要跳过检查的目录和文件名称，配置示例如下：

```
/dist
/publics/libs
/origin
package.json
```

### 4. 安装 Prettier

```
npm i prettier -D
```

### 5. 安装 eslint-config-prettier

主要是为了禁用 ESLint 中和 Prettier 配置有冲突的规则

```
npm i eslint-config-prettier -D
```

在.eslintrc.js 中引入

```
extends: ["eslint:recommended", "prettier"],
```

### 6. 安装 eslint-plugin-prettier

主要是用来将 Prettier 格式化的能力集成到 ESLint 中

```
npm i eslint-plugin-prettier -D
```

修改.eslintrc.js 配置

```
{
 "rules":{
    "prettier/prettier":"error"
 },
 "plugins": ["prettier"]，
}
```

或将以上两个步骤结合在一起，使用 extends 代替

```
{
 "extends": [
   "eslint:recommended",
   "plugin:prettier/recommended"
 ]
}
```

### 7. 创建.prettierrc.js 文件，我们可以对 prettier 的默认配置进行修改

```
module.exports = {
 // 行尾需要有分号
 semi: false,
}
```

### 8. 创建.prettierignore

忽略某些文件的格式化

```
 dist
 node_modules
 .eslintignore
 .prettierignor
```

## 三、VSCode 中集成 ESLint + Prettier

### 1. 安装如下插件：

- ESLint
- Prettier
- EditorConfig for VS Code，这个插件可以让编译器读取配置文件，这个插件可以让编译器读取配置文件

### 2. 配置 setting.json

1. 配置工作区 setttings.json 文件

```
{
  // #每次保存的时候自动格式化
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```

2. 用户区 settings.json，在项目根目录创建.vscode 目录，并且在该目录下创建 settings.json 文件。

```
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.validate": ["typescript", "javascript", "vue"]
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

## 四、参考链接

- https://eslint.bootcss.com/docs/user-guide/configuring
- https://blog.csdn.net/brokenkay/article/details/111106266
- https://zhuanlan.zhihu.com/p/295291463
- https://www.cnblogs.com/Yellow-ice/p/15127392.html
- https://www.jianshu.com/p/18b27d97a5e7
