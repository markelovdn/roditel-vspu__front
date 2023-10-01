<script setup lang="ts">

const props = defineProps<{
    title: string,
    description: string,
    link: string
}>()

</script>

<template>
    <div class="card-2">
        <div class="card-2__title">
            <div class="card-2__title_point"></div>
            <h5>{{ title }}</h5>
        </div>
        <div class="card-2__content">{{ description }}</div>
        <router-link class="card-2__link" :to="link">
            <div class="card-2__link">Подробнее</div>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
.card-2 {
    display: flex;
    width: 100%;
    padding: 28px 62px 28px 75px;
    background: #f5f5f5;
    border-radius: 20px;
    flex-direction: column;

    &__title {
        position: relative;

        &_point {
            position: absolute;
            top: 10px;
            left: -25px;
            width: 8px;
            height: 8px;
            background-color: $grey-2;
            border-radius: 50%;
        }
    }

    &__content {
        margin-top: 16px;
        color: $grey-2;
        font-weight: 500;
        line-height: 120%;
    }

    &__link {
        width: max-content;
        margin-top: 16px;
        color: $Blue-lighter;
        cursor: pointer;
        text-decoration: none !important;
    }
}
</style>
