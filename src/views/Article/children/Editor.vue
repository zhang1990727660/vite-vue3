<script setup lang="ts">
import { ref } from "vue"

const content = ref()
</script>

<template>
  <div class="editor wh-100 flex-column">
    <div class="editor-header flex-row items-center">
      <input
        class="title-input flex-1"
        placeholder="输入文章标题..."
        spellcheck="false"
        maxlength="80"
      />
      <div class="operate">
        <span class="autosave mr-4">保存成功</span>
        <a-button type="default" class="mr-4">草稿箱</a-button>
        <a-button type="primary" class="mr-4">发布</a-button>
      </div>
    </div>
    <div class="editor-content flex-1">
      <v-md-editor v-model="content" height="100%"></v-md-editor>
    </div>
  </div>
</template>

<style scoped lang="less">
.editor-header {
  height: 64px;
  border-bottom: 1px solid #ddd;
}

.title-input {
  padding-left: 40px;
  font-size: 24px;
  font-weight: 500;
  color: #1d2129;
  outline: none;
}

.autosave {
  font-weight: bold;
  color: #c9cdd4;
}

.editor-content {
  overflow-y: hidden;
}
</style>
