<script setup lang="ts">
import SideBarItem from "./SideBarItem.vue";
</script>

<template>
  <div class="sidebar-wrapper">
    <div><SideBarItem :style="{ background: 'rgba(228, 235, 246, 0.2)' }" /></div>

    <div><SideBarItem /></div>
    <div><SideBarItem /></div>

    <div><SideBarItem /></div>
    <div><SideBarItem /></div>

    <div><SideBarItem /></div>
    <div><SideBarItem /></div>

    <div><SideBarItem /></div>
    <div><SideBarItem /></div>

    <div><SideBarItem /></div>
    <div><SideBarItem /></div>

    <div><SideBarItem /></div>
    <div><SideBarItem /></div>

    <div><SideBarItem /></div>
    <div><SideBarItem /></div>

    <div><SideBarItem /></div>
    <div><SideBarItem /></div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;
}
</style>
