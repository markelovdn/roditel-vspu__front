<script setup lang="ts">
import { ref } from "vue";

const content = ['Родителям или законным представителям детей дошкольного возраста, не посещающих дошкольные образовательные организации', 'Родителям или законным представителям, чьи дети находятся на семейном обучении',
    'Родителям или законным представителям детей с ограниченными возможностями здоровья (ОВЗ) и инвалидностью,в первую очередь раннего возраста',
    'Родителям или законным представителям нуждающимся в помощи при воспитании детей, посещающих образовательныеорганизации, но имеющих различные проблемы в поведении, развитии, социализации',
    'Гражданам, желающим принять на воспитание в свои семьи детей, оставшихся без попечения родителей',

]

</script>

<template>
    <div class="banner-container ">
        <div class="title">
            <h2>Кому оказывается бесплатная помощь?</h2>
        </div>
        <div class="content">
            <div v-for="text in content" class="content__item" :key="text">
                <div class="content__item_point"></div>
                <div class="content__item_text">{{ text
                }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.banner-container {
    margin-top: 97px;
    width: 100%;
    border-radius: 30px;
    min-height: 767px;
    background: #F5F5F5;
    padding: 79px 55px 79px 79px;

    display: flex;
    justify-content: space-around;
}

.title {
    width: 50%;
}

.content {
    width: 50%;
    display: grid;
    row-gap: 44px;


    &__item {
        display: grid;
        grid-template-columns: auto auto;
        gap: 0 24px;

        &_text {
            color: $Text-color;
            font-size: 20px;
            line-height: 120%;
            /* 24px */
        }

        &_point {
            margin-top: 8px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: $yellow;
        }
    }
}
</style>
