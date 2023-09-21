<script setup lang="ts">

</script>

<template>
    <div class="block">
        <div class="block__title">
            <h2>Формат оказания услуг</h2>
            <span class="block__title_sub-title">Вы можете получить бесплатную консультацию от специалистов
                социально-психологического центра ВГСПУ
                следующими способами</span>
        </div>
        <div class="block__content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.block {
    margin-top: 75px;
    display: flex;
    justify-content: space-between;


    &__title {
        display: flex;
        justify-content: space-between;

        &_sub-title {
            width: 541px;
            color: #678570;

            font-size: 16px;

            font-weight: 500;
            line-height: 120%;
        }
    }

    &__content {
        display: flex;
        justify-content: space-between;
        gap: 30px;
        margin: 52px 0 0 0;
    }
}
</style>
