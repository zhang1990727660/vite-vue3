const fs = require("fs")
const path = require("path")
const express = require("express")

const app = express()
const port = "8090"

// 获取文章列表
app.get("/article/getLists", (req, res) => {
  const fileArr = getAllFile("static/article/")
  const list = []
  fileArr.forEach(async ({ pathName, file }) => {
    // 读取文件内容
    console.log(`开始读取 ${file} 文件.....`)
    const data = await readFile(pathName)
    list.push({
      title: file,
      publish: "2020-12-01",
      content: data,
    })
  })
  res.send(res.JSON(list))
})

// 获取文章列表
app.get("/article/detail", (req, res) => {
  const fileArr = getAllFile("static/article/")
  const list = []
  fileArr.forEach(async ({ pathName, file }) => {
    // 读取文件内容
    console.log(`开始读取 ${file} 文件.....`)
    const data = await readFile(pathName)
    list.push({
      title: file,
      publish: "2020-12-01",
      content: data,
    })
  })
  res.send(res.JSON(list))
})

app.listen(port, () => {
  console.log(`app listener at http://localhost:${port}`)
})

const resolve = (dir) => {
  return path.join(__dirname, "../", dir)
}

// 读取指定目录下的所有文件
function getAllFile(dir) {
  return fs
    .readdirSync(dir)
    .map((file) => ({ pathName: resolve(dir + "/" + file), file }))
}

// 读取文件
function readFile(pathName) {
  return new Promise((resolve) => {
    fs.readFile(pathName, "utf-8", function (err, data) {
      if (err) {
        console.log("read error")
      } else {
        data = JSON.parse(data)
        resolve(data)
      }
    })
  })
}

// 写入文件
function writeFile(file, data) {
  const outputPath = resolve("dist")
  const pathName = resolve("dist/" + file)
  // 创建dist目录  这里如果不先新建dist目录，如果dist目录不存在，则执行fs.writeFile时，会报错
  fs.mkdir(outputPath, { recursive: true }, function (err) {
    if (err) {
      console.log("mkdir error")
      return
    }
    // 开始写文件
    fs.writeFile(
      pathName,
      JSON.stringify(data),
      { encoding: "utf-8" },
      function (err) {
        if (err) {
          console.log("write error", err)
          return
        }
        console.log("文件写入完毕！！！！")
      },
    )
  })
}

;(function () {
  // 读取origin目录下的所有文件
  const fileArr = getAllFile("origin/")
  fileArr.forEach(async ({ pathName, file }) => {
    // 读取文件内容
    console.log(`开始读取 ${file} 文件.....`)
    const data = await readFile(pathName)

    // 写入文件
    console.log("开始写入文件.....")
    writeFile(file, data)
  })
})()
