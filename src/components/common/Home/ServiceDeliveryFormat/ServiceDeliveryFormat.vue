<script setup lang="ts">
import { ref } from 'vue';
import BlockContainer from './BlockContainer.vue'
import Card1 from './Card1.vue'
import Card2 from './Card2.vue';

const row1 = [
    {
        title: 'Диспетчерское консультирование по телефону', description: "Навигация к специалистам"
    },
    {
        title: 'Просветительские мероприятия для родительского сообщества', description: "С выдачей сертификата"
    },
    { title: 'Содержательное консультирование при личной встрече' },
    { title: 'Опрос с обратной связью' }
]


</script>

<template>
    <div class="container">
        <BlockContainer>
            <Card1 v-for="row, index in row1" :number="index + 1" :title="row.title" :description="row.description"
                :key="row.title" />
        </BlockContainer>

        <BlockContainer>
            <Card2 :title="'Очное консультирование'"
                :description="'По адресу: г.Волгоград, проспект Ленина, 27. Ауд.01-19, 03-14а, 03-14б (Волгоградский государственный социально-педагогический университет)'"
                :link="''" />
            <Card2 :title="'Онлайн консультирование'" :link="''"
                :description="'По телефону, видеосвязи через интернет, письменный ответ на запрос через сайт, мессенджеры, электронную почту, по итогам опроса / анкетирования'" />
        </BlockContainer>

        <div class="buttons">
            <div class="button__container">
                <q-btn class="button" outline style="color: #f7b70b">
                    <span class="button__label  text-primary">Записаться по телефону</span>
                </q-btn>
            </div>
            <div class="button__container">
                <q-btn class="button" outline style="color: #f7b70b">
                    <span class="button__label  text-primary">Задать вопрос специалисту</span>
                </q-btn>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {}


.buttons {
    margin-top: 20px;
    display: flex;
    gap: 30px;
}

.button {
    display: flex;
    align-items: center;

    border-radius: 10px;
    border: solid 1px #f7b70b;
    padding: 16px 30px;

    &__container {
        width: 100%;
    }

    &__label {
        font-size: 16px;
        display: flex;
        align-items: center;
        line-height: 120%;
    }
}
</style>
