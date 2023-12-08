<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref, watch } from "vue";

import { TConsultation } from "@/api/Consultations/types";
import { TWebinarsRequestOption } from "@/api/Webinars/types";
import ChatSideBarWrapper from "@/components/Chat/ChatSideBarWrapper.vue";
import ChatWrapper from "@/components/Chat/ChatWrapper.vue";
import MessageInput from "@/components/Chat/MessageInput.vue";
import ConsultantFeedBack from "@/components/modals/ConsultantFeedback/ConsultantFeedBack.vue";
import CreateConsultationModal from "@/components/modals/ConsultationModal/CreateConsultationModal.vue";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useCollectionsStore } from "@/stores/collectionsStore";
import { useConsultationsStore } from "@/stores/consultationsStore";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
const collectionsStore = useCollectionsStore();

const { getSpecializationsWithAll: optionsCategories } = storeToRefs(collectionsStore);
const { getWebinarLectorsWithAll: optionsLectors } = storeToRefs(webinarsStore);

const consultationsStore = useConsultationsStore();
const idActiveChat = ref(0);
const isShowCreateConsultationModal = ref(false);
const queryParams = ref<TWebinarsRequestOption>({ page: 1 });
const inputDate = ref();
const search = ref();
const specializationId = ref(0);
const lectorId = ref(0);

// const setPage = (page: number) => (queryParams.value.page = page);
// const paginationPage = ref(1);

const showFeedbackModal = ref(false);

const setIdActiveChat = (id: number) => {
  consultationsStore.connectChannel(id);
  idActiveChat.value = id;
};

const sendMessage = (message: string) => {
  consultationsStore.sendMessage(message, idActiveChat.value);
};
const idActiveChatMessages = computed(
  () => consultationsStore.consultations.find((item) => item.id === idActiveChat.value)?.messages || [],
);

const idActiveChatConsultation = computed(
  () =>
    consultationsStore.consultations[
      consultationsStore.consultations.findIndex((item) => item.id === idActiveChat.value)
    ],
);

const dateToString = computed(() =>
  inputDate.value ? `c ${inputDate.value.from} по ${inputDate.value.to}` : "Выберите дату",
);
const dateClear = () => {
  inputDate.value = null;
  setData();
};
const setData = (value?: any) => {
  if (value) {
    queryParams.value.dateBetween = `${value.from}, ${value.to}`;
  } else {
    delete queryParams.value["dateBetween"];
  }
};
const setSpecialization = (value: string) => (queryParams.value.category = Number(value));
const setLectors = (value: string) => (queryParams.value.lector = Number(value));

watch(search, () => (queryParams.value.searchField = search.value));

onBeforeMount(() => {
  webinarsStore.requestLectors();
  collectionsStore.requestSpecializations();
  consultationsStore.requestConsultations({}).then((data: TConsultation[]) => {
    idActiveChat.value = data[0].id;
    consultationsStore.connectChannel(data[0].id);
  });
  useRequestPayload(queryParams, consultationsStore.requestConsultations, {});
});
</script>

<template>
  <div class="question">
    <div class="question__header">
      <div class="flex justify-between justify-between question__header_line">
        <div class="question__box">
          <h5>Вопросы</h5>
        </div>

        <div class="question__box">
          <q-btn outline style="color: #f7b70b" class="q-btn--form q-ml-sm">
            <span class="text-primary question__btn-label" @click="isShowCreateConsultationModal = true">
              Задать вопрос
            </span>
          </q-btn>
        </div>
      </div>

      <div class="flex justify-between justify-between question__header_line">
        <div>
          <q-input v-model="search" debounce="500" filled placeholder="Поиск">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div>
          <q-input v-model="dateToString" dense filled>
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="inputDate" range @update:model-value="setData">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Закрыть" color="primary" flat />
                      <q-btn v-close-popup label="Сбросить" color="primary" flat @click="dateClear()" />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <q-select
            v-model="specializationId"
            input-class="q-select--form"
            label="Лектор*"
            outlined
            class="fit q-mb-sm"
            :options="optionsLectors"
            :option-label="(item) => item.label"
            emit-value
            map-options
            @update:model-value="setLectors" />
        </div>
        <div>
          <q-select
            v-model="lectorId"
            input-class="q-select--form"
            label="Категория*"
            outlined
            class="fit q-mb-sm"
            :options="optionsCategories"
            :option-label="(item) => item.label"
            emit-value
            map-options
            @update:model-value="setSpecialization" />
        </div>
      </div>
    </div>

    <div class="question__wrapper">
      <div class="question__sidebar">
        <ChatSideBarWrapper
          :active-chat="idActiveChat"
          :consultations="consultationsStore.consultations"
          @set-change-chat="setIdActiveChat" />
      </div>
      <div class="question__content">
        <ChatWrapper
          v-if="idActiveChatConsultation"
          :messages="idActiveChatMessages"
          :consultation="idActiveChatConsultation" />
        <div v-else>
          <h4 class="q-pt-md">Создайте новую заявку</h4>
          <p style="text-align: center" class="q-pt-md">Вы мажите задать вопрос консультанту</p>
        </div>
        <MessageInput @send-message="sendMessage" />
      </div>
    </div>

    <ConsultantFeedBack v-if="showFeedbackModal" @close="showFeedbackModal = false" />
    <CreateConsultationModal
      v-if="isShowCreateConsultationModal"
      @close="isShowCreateConsultationModal = false"></CreateConsultationModal>
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #e4ebf5;

  &__wrapper {
    display: flex;
    height: 592px;
  }

  &__header {
    padding: 0 35px;
    background-color: $white;
    border-radius: 10px 10px 0 0;
    filter: drop-shadow(0 4px 4px rgb(0 0 0 / 3%));

    &_line {
      height: 80px;
    }
  }

  &__box {
    display: flex;
    align-items: center;

    &:first-child {
      gap: 35px;
    }
  }

  &__sidebar {
    display: flex;
    background-color: #ffffff;
    flex-basis: 36%;
    border-right: 1px solid var(--grey-2);
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 64%;
    height: 100%;
  }
  &__btn-label {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 19px;
  }
}
</style>

<style lang="scss">
.q-field__control,
.q-field__marginal {
  height: 46px;
}
</style>
