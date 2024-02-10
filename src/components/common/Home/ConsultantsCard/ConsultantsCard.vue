<script setup lang="ts">
import { inject, onMounted, ref } from "vue";

import ConsultantDescriptionModal from "@/components/modals/ConsultantDescriptionModal/ConsultantDescriptionModal.vue";
import CreateConsultationModal from "@/components/modals/ConsultationModal/CreateConsultationModal.vue";
import RulesModal from "@/components/modals/RulesModal/RulesModal.vue";
import { AuthModalInjectionKey, AuthModalProviderData } from "@/utils/injectionKeys";

import type { Consultant } from "./types";

const props = defineProps<{
  consultant: Consultant;
  backGroundColor?: string;
}>();
const description = ref<HTMLElement | null>(null);
const isFullShow = ref(false);
const isShowModal = ref(false);
const isShowCreateConsultationModal = ref(false);
const maxDescriptionHeight = 73;
const authModal = inject(AuthModalInjectionKey, {} as AuthModalProviderData);

const isShowRuleModal = ref(false);
const isAcceptRules = ref(false);

const createQuestion = () => authModal.toCreateQuestion(isShowCreateConsultationModal, props.consultant);

onMounted(() => {
  if (description.value && description.value?.getBoundingClientRect().height > maxDescriptionHeight) {
    isFullShow.value = true;
  }
});
</script>

<template>
  <div class="card" :style="{ 'background-color': props.backGroundColor }">
    <q-img class="card__photo" :src="props.consultant.photo" />
    <h5 class="card__name">
      {{ consultant.user.firstName }} {{ consultant.user.surName }} {{ consultant.user.secondName }}
    </h5>
    <div ref="description" class="card__description" :class="{ card__description_hide: isFullShow }">
      <span>{{ consultant.description }}</span>
    </div>
    <div v-if="isFullShow" class="card__next"><span @click="isShowModal = true">Подробнее</span></div>
    <ConsultantDescriptionModal v-if="isShowModal" :consultant="consultant" @close="isShowModal = !isShowModal" />
    <CreateConsultationModal
      v-if="isShowCreateConsultationModal"
      v-model:show="isShowRuleModal"
      v-model:accept="isAcceptRules"
      :consultant="consultant"
      @close="isShowCreateConsultationModal = false"></CreateConsultationModal>
    <RulesModal
      v-if="isShowRuleModal"
      v-model:show="isShowRuleModal"
      v-model:accept="isAcceptRules"
      @close="isShowRuleModal = false" />

    <q-btn color="yellow card__button" @click="createQuestion()">
      <div class="btn__label">Задать вопрос специалисту</div>
    </q-btn>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 360px;
  height: 515px;
  padding: 25px;
  background: $background-secondary;
  border-radius: 20px;
  font-size: 16px;
  user-select: none; //Для нормального скролла мышкой

  &__photo {
    height: 214px;
    border-radius: 20px;
  }

  &__name {
    margin-top: 28px;
  }

  &__description {
    margin-top: 24px;
    font-weight: 400;
    line-height: 132%;

    &_hide {
      display: -webkit-box;
      height: 65px;
      overflow-y: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  &__next {
    margin-top: 10px;
    color: $blue-accent;
    font-weight: 400;
    line-height: 132%;
    cursor: pointer;
  }

  &__button {
    position: absolute;
    bottom: 20px;
    width: calc(100% - 25px * 2);
  }
}
</style>
