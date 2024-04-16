<script setup lang="ts">
import { mdiClose } from "@quasar/extras/mdi-v6";
import { ref } from "vue";

import ReviewGrade from "@/components/common/Home/ReviewGrade/ReviewGrade.vue";
import { useModal } from "@/hooks/useModal";
import { isNotZero, useValidation } from "@/hooks/useValidation";
import { useConsultantStore } from "@/stores/consultantStore";
import notify from "@/utils/notify";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { TConsultantFeedbackPayload } from "./types";

const emit = defineEmits(["close", "validation-change"]);
const props = defineProps<{ consultationId: number; quality?: number }>();

const consultantStore = useConsultantStore();

const data = ref<TConsultantFeedbackPayload>({
  consultationId: props.consultationId,
  quality: props.quality || 0,
  conditions: 0,
  availability: 0,
  politeness: 0,
  complaints: "",
  proposals: "",
});

const { closeModal } = useModal(emit, data);

const { isValid } = useValidation<TConsultantFeedbackPayload>(data, emit, {
  quality: { isNotZero },
  conditions: { isNotZero },
  availability: { isNotZero },
  politeness: { isNotZero },
  complaints: {},
  proposals: {},
  consultationId: {},
});

const handleData = () => {
  consultantStore
    .setConsultantFeedBack(data.value)
    .then(() => {
      notify({ type: "positive", message: "Данные успешно сохранены" });
      closeModal({ force: true });
    })
    .catch(() => notify({ type: "negative", message: "Не удалось сохранить данные" }));
};
</script>

<template>
  <ModalWrapper full-width>
    <template #header>
      <div class="header-box">
        <div class="title">Пожалуйста, оцените качество консультации</div>
        <q-icon :name="mdiClose" class="cursor-pointer close" @click="closeModal" />
      </div>
    </template>
    <div class="wrapper">
      <div class="box">
        <div class="divider"></div>
        <div class="text">
          Удовлетворены ли Вы качеством оказанной услуги? Соответствовало ли содержание консультации имеющейся проблеме,
          помог ли консультант Межрегиональной службы консультирования родителей ВГСПУ? *
        </div>
        <ReviewGrade v-model="data.quality" :max="5" />
      </div>
      <div class="box">
        <div class="divider"></div>
        <div class="text">
          Удовлетворены ли Вы условиями предоставления услуги (оценивается доступность для людей с ОВЗ, доступность
          записи, время ожидания от момента обращения, возможность выбора формата оказания услуги)? *
        </div>
        <ReviewGrade v-model="data.conditions" :max="5" />
      </div>
      <div class="box">
        <div class="divider"></div>
        <div class="text">
          Удовлетворены ли Вы полнотой и доступностью информации о работе Службы и порядке предоставления услуг ? (при
          личном обращении, по телефону, на официальном сайте организации, на сайте
          <a href="https://roditel-vspu.ru" target="_blank">https://roditel-vspu.ru/</a>
          , на информационных стендах) *
        </div>
        <ReviewGrade v-model="data.availability" :max="5" />
      </div>
      <div class="box">
        <div class="divider"></div>
        <div class="text">Оцените доброжелательность и вежливость консультантов Службы *</div>
        <ReviewGrade v-model="data.politeness" :max="5" />
      </div>

      <div class="box">
        <div class="divider"></div>
        <div class="text">Есть ли у Вас жалобы на работу Межрегиональной службы консультирования родителей ВГСПУ?</div>
        <q-input v-model="data.complaints" outlined type="textarea" placeholder="Введите ваш комментарий" />
      </div>

      <div class="box">
        <div class="divider"></div>
        <div class="text">
          Есть ли у Вас предложения и пожелания по улучшению работы Межрегиональной службы консультирования родителей
          ВГСПУ?
        </div>
        <q-input v-model="data.proposals" outlined type="textarea" placeholder="Введите ваш комментарий" />
      </div>

      <div class="btn-block">
        <q-btn label="Отправить" :disable="!isValid" class="q-btn--form" color="primary" @click="handleData()" />
        <q-btn
          label="Оценить позже"
          class="q-ml-sm q-btn--form"
          flat
          :ripple="false"
          color="grey-1"
          @click="closeModal()" />
      </div>
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}
.title {
  color: var(--blue-accent, #253281);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  text-transform: uppercase;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.box {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.divider {
  height: 1px;
  background-color: var(--grey-1, #a3a3a3);
  opacity: 0.2;
}

.text {
  color: var(--Text-color, #525252);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
}

.btn-block {
  display: flex;
  gap: 16px;
}

.close {
  font-size: 20px;
  color: $grey-2;
}
</style>

<style lang="scss"></style>
