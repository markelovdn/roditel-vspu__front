<script setup lang="ts">
defineProps<{
  color?: string;
  size?: number;
}>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size || 21"
    :height="size || 21"
    :viewBox="size ? `0 0 ${size} ${size}` : '0 0 21 21'"
    fill="none">
    <path
      d="M10.8368 9.83301C12.4936 9.83301 13.8368 8.48986 13.8368 6.83301C13.8368 5.17615 12.4936 3.83301 10.8368 3.83301C9.17994 3.83301 7.83679 5.17615 7.83679 6.83301C7.83679 8.48986 9.17994 9.83301 10.8368 9.83301Z"
      :fill="color || '#315194'" />
    <path
      d="M3.83679 18.833C3.83679 14.967 6.9708 11.833 10.8368 11.833C14.7028 11.833 17.8368 14.967 17.8368 18.833H3.83679Z"
      :fill="color || '#315194'" />
  </svg>
</template>
