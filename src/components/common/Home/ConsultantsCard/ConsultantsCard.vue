<script setup lang="ts">
import { ref } from 'vue';
import type { Consultant } from './type';


const props = defineProps<{
    consultant: Consultant
}>()

</script>

<template>
    <div class="card">
        <q-img class="card__photo" :src="props.consultant.photo" />
        <h5 class="card__name">{{ consultant.user.surName }}</h5>
        <span class="card__description">{{ consultant.description }}</span>
        <q-btn color="yellow card__button">
            <div class="btn__label">Задать вопрос специалисту</div>
        </q-btn>
    </div>
</template>



<style lang="scss" scoped>
.card {
    padding: 25px;
    border-radius: 20px;
    background: $background-secondary;
    width: 360px;
    height: 515px;

    &__photo {
        height: 214px;
        border-radius: 20px;
    }

    &__name {
        margin-top: 28px;
    }

    &__description {

        margin-top: 24px;
        font-size: 16px;
        font-weight: 400;
        line-height: 132%;
    }

    &__button {
        margin-top: 28px;
        width: 100%;
    }

}
</style>
