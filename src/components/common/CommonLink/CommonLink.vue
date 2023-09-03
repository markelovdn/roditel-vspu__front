<script setup lang="ts">
import type { CommonLinkItem } from './types'

const props = defineProps<CommonLinkItem>()
</script>

<template>
    <a :href="props.to" class="link" :style="`color: ${props.color}`" target="_blank" rel="">
        <slot></slot>
    </a>
</template>

<style scoped lang="scss">
.link {
    color: $grey-2;
    cursor: pointer;
}
</style>