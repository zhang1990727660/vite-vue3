<script setup lang="ts">
import { Ref, ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { getArticleDetail } from "@/api/article"

interface Article {
  title?: string
  intro?: string
  content?: string
  userName?: string
  publish?: string
}

const route = useRoute()
const articleObj: Ref<Article> = ref({})
// 获取文章详情
const fetcthData = async function (id) {
  const [err, data]: any = await getArticleDetail({ id })
  if (!err) {
    articleObj.value = data || {}
    articleObj.value.content = JSON.parse(articleObj.value.content)
    // console.log("a", articleObj.value.content)
  }
}
onMounted(() => {
  const { id } = route.query
  fetcthData(id)
})
</script>

<template>
  <div class="container">
    <div class="header">
      <!-- top box -->
      <div class="top-box flex-row items-center">
        <div class="user-logo"></div>
        <div class="user-intro pl-4 flex-column">
          <span class="user-name">{{ articleObj.userName }}</span>
          <span class="publish">{{ articleObj.publish }}</span>
        </div>
      </div>
      <!-- header content -->
      <h2 class="font-bold text-2xl">{{ articleObj.title }}</h2>
    </div>
    <body>
      <v-md-editor
        v-model="articleObj.content"
        mode="preview"
        height="100%"
      ></v-md-editor>
      <!-- <v-md-preview-html :html="articleObj.content"></v-md-preview-html> -->
    </body>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 80%;
  margin: 0 auto;
}

.header {
  padding: 0 2rem;
}

.user-intro {
  padding: 20px 10px 20px 16px;
}

.user-logo {
  width: 32px;
  height: 32px;
  background-color: #ccc;
  border-radius: 50%;
}
</style>
