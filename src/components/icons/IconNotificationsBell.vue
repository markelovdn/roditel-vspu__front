<script setup lang="ts">
defineProps<{
  count: number;
}>();
</script>

<template>
  <div class="icon-wrapper">
    <q-tooltip v-if="count > 9" anchor="top right" self="center middle" class="bg-red text-body2"
      transition-show="flip-right" transition-hide="flip-left">
      {{ count }}
    </q-tooltip>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path
        d="M12.0001 2.8999C8.02368 2.8999 4.80013 6.12345 4.80013 10.0999V14.4028L3.9516 15.2514C3.60841 15.5946 3.50574 16.1107 3.69148 16.5591C3.87721 17.0075 4.31478 17.2999 4.80013 17.2999H19.2001C19.6855 17.2999 20.1231 17.0075 20.3088 16.5591C20.4945 16.1107 20.3919 15.5946 20.0487 15.2514L19.2001 14.4028V10.0999C19.2001 6.12345 15.9766 2.8999 12.0001 2.8999Z"
        fill="#F7B70B" />
      <path
        d="M12.0001 22.0999C10.0119 22.0999 8.4001 20.4881 8.4001 18.4999H15.6001C15.6001 20.4881 13.9883 22.0999 12.0001 22.0999Z"
        fill="#F7B70B" />
    </svg>
    <div v-if="count" class="count">
      {{ count > 9 ? "9+" : count }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-wrapper {
  position: relative;
}

.count {
  position: absolute;
  top: 0;
  right: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 10px;
  color: var(--q-background-primary);
  background-color: var(--error);
  border-radius: 40% /50%;
  font-size: 8px;
  font-weight: 700;
}

.tooltip {
  background: var(--error) !important;
  font-size: 16;
  font-weight: 700;
}
</style>
