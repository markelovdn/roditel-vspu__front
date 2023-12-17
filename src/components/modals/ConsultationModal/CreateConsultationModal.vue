<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { TAllConsultants } from "@/api/Consultant/types";
import { TConsultationPayload } from "@/api/Consultations/types";
import { Consultant } from "@/components/common/Home/ConsultantsCard/types";
import { useModal } from "@/hooks/useModal";
import { requiredValidator, useValidation } from "@/hooks/useValidation";
import { useCollectionsStore } from "@/stores/collectionsStore";
import { useConsultantStore } from "@/stores/consultantStore";
import { useConsultationsStore } from "@/stores/consultationsStore";

import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
const route = useRoute();
const router = useRouter();
const emit = defineEmits(["close"]);

const isShowRuleModal = defineModel("show", {
  default: false,
});

const isAcceptRules = defineModel("accept", {
  default: false,
});

const props = defineProps<{
  consultant?: Consultant;
}>();

const collectionsStore = useCollectionsStore();
const consultantStore = useConsultantStore();
const consultationsStore = useConsultationsStore();
const { getSpecializations: optionsSpecializations } = storeToRefs(collectionsStore);
const { getConsultantsAll: optionsConsultants } = storeToRefs(consultantStore);

const data = ref<TConsultationPayload<number | null>>({
  consultantId: Number(route.query.consultantId) || props.consultant?.user.id || null,
  allConsultants: false,
  messageText: "",
  specializationId: null,
});

const { closeModal } = useModal(emit, data);

const { handleBlur, getErrorAttrs, isValid } = useValidation<TConsultationPayload<number | null>>(data, emit, {
  consultantId: {},
  messageText: { requiredValidator },
  specializationId: { requiredValidator },
  allConsultants: {},
});

const closeCreateConsultationModal = () => {
  closeModal({ force: true });
  const query = { ...route.query };
  delete query.consultantId;
  delete query.isOpenNewConsultation;
  router.replace({ query });
};

const handleCreateConsultation = () => {
  consultationsStore.createConsultation(data.value);
  closeCreateConsultationModal();
};
const handleRulesModal = () => {
  !isAcceptRules.value && (isShowRuleModal.value = true);
};

onMounted(() => {
  collectionsStore.requestSpecializations();
  consultantStore.requestAllConsultants().then((res: TAllConsultants) => {
    data.value.specializationId =
      res.find((item) => item.userId === Number(route.query.consultantId) || props.consultant?.user.id)?.specialization
        .id || null;
  });
});
</script>

<template>
  <div>
    <ModalWrapper header="Задать вопрос">
      <q-select
        v-bind="getErrorAttrs('specializationId')"
        v-model="data.specializationId"
        input-class="q-select--form"
        label="Выберите категорию консультации*"
        outlined
        class="fit q-mb-sm"
        :options="optionsSpecializations"
        :option-label="(item) => item.label"
        emit-value
        map-options
        @blur="handleBlur('specializationId')" />

      <q-select
        v-model="data.consultantId"
        input-class="q-select--form"
        label="Выберите специалиста*"
        outlined
        class="fit q-mb-sm"
        :options="optionsConsultants"
        :option-label="(item) => item.label"
        emit-value
        map-options
        :disable="data.allConsultants || data.specializationId === null" />

      <q-checkbox
        v-model="data.allConsultants"
        :disable="data.specializationId === null"
        label="Любой специалист"
        @update:model-value="data.consultantId = null" />

      <q-input
        v-bind="getErrorAttrs('messageText')"
        v-model="data.messageText"
        autogrow
        class="q-mb-sm"
        label="Ваш вопрос*"
        :disable="data.consultantId === null && data.allConsultants === false"
        @blur="handleBlur('messageText')" />

      <q-checkbox
        v-model="isAcceptRules"
        class="create-checkbox"
        label="Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных *Поле обязательно для заполнения"
        @update:model-value="handleRulesModal" />

      <div class="row no-wrap q-mt-lg">
        <q-btn
          label="Отправить"
          :disable="(!isAcceptRules && !isValid) || (data.consultantId === null && data.allConsultants === false)"
          class="q-btn--form"
          color="primary"
          @click="handleCreateConsultation()" />
        <q-btn
          label="Закрыть"
          class="q-ml-sm q-btn--form"
          flat
          :ripple="false"
          color="grey-1"
          @click="closeCreateConsultationModal" />
      </div>
    </ModalWrapper>
  </div>
</template>

<style lang="scss" scoped>
.create-checkbox {
  align-items: flex-start;
}
</style>
