<script setup lang="ts">
import Menu from "./components/Menu.vue"
</script>

<template>
  <div class="wh-100 flex flex-row">
    <Menu />
    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
