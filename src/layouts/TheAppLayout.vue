<script setup lang="ts"></script>

<template>
  <header>
    app layout
    <nav>...</nav>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer></footer>
</template>

<style scoped>
main {
  background-color: rgb(28, 111, 111);
}
</style>
