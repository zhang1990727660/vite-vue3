<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getArticleList } from "@/api/article"

const router = useRouter()
const articleList = ref([])

const fetchData = async function () {
  const [err, data]: any = await getArticleList()
  if (!err) {
    articleList.value = data
  }
}
onMounted(() => {
  fetchData()
})

function handleSeeDetail() {
  router.push({ path: "/article/detail", query: { id: 1 } })
}
</script>

<template>
  <div class="article-container">
    <h2 class="article-header text-3xl text-center p-6">文章管理</h2>
    <div class="article-content">
      <div class="ac-list text-sm">
        <div
          class="ac-item cursor-pointer leading-8"
          v-for="(item, index) in articleList"
          :key="index"
          @click="handleSeeDetail()"
        >
          <div class="name font-bold">{{ item.userName }}</div>
          <div class="content text-base font-bold">{{ item.title }}</div>
          <div class="intro text-sm pt-0.5">{{ item.intro }}</div>
          <div class="publish text-sm pt-1">发布时间：{{ item.publish }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.article-container {
}

.article-header {
  border-bottom: 1px solid rgba(229, 231, 235, 1);
}

.article-content {
  width: 80%;
  margin: 0 auto;
}

.ac-item {
  padding: 10px;
  line-height: 36px;
  border-bottom: 1px solid rgba(229, 231, 235, 1);
}
</style>
