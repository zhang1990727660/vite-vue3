<script setup lang="ts">
import { ref } from "vue"

const value = ref(0)
console.log(value)
</script>

<template>
  <div class="home">
    <h1>Home page</h1>
    <div class="item">
      <a-button type="primary">Primary</a-button>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
