<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { TConsultation } from "@/api/Consultations/types";
import { TWebinarsRequestOption } from "@/api/Webinars/types";
import ChatWrapper from "@/components/Chat/ChatWrapper.vue";
import MessageInput from "@/components/Chat/MessageInput.vue";
import SideBarItem from "@/components/Chat/SideBarItem.vue";
import CreateConsultationModal from "@/components/modals/ConsultationModal/CreateConsultationModal.vue";
import RulesModal from "@/components/modals/RulesModal/RulesModal.vue";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useCollectionsStore } from "@/stores/collectionsStore";
import { useConsultationsStore } from "@/stores/consultationsStore";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
const collectionsStore = useCollectionsStore();

const { getSpecializationsWithAll: optionsCategories } = storeToRefs(collectionsStore);
const { getWebinarLectorsWithAll: optionsLectors } = storeToRefs(webinarsStore);
const route = useRoute();

const consultationsStore = useConsultationsStore();
const idActiveChat = ref(0);
const isShowCreateConsultationModal = ref(false);
const queryParams = ref<TWebinarsRequestOption>({ page: 1, actual: "yes" });
const inputDate = ref();
const search = ref();
const specializationId = ref(0);
const lectorId = ref(0);
const actual = ref<"yes" | "no">((route.query.actual as "yes" | "no") || "yes");
const isShowRuleModal = ref(false);
const isAcceptRules = ref(false);

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
const setConsultant = (value: string) => (queryParams.value.consultant = Number(value));
const setActual = (value: "yes" | "no") => (queryParams.value.actual = value);
const setFirstActiveChat = (data: TConsultation[]) => {
  if (!data.length) return;
  idActiveChat.value = data[0].id;
  consultationsStore.connectChannel(data[0].id);
};

let searchTimeoutId: ReturnType<typeof setTimeout>;
watch(search, () => {
  clearTimeout(searchTimeoutId);
  searchTimeoutId = setTimeout(() => {
    queryParams.value.searchField = search.value;
  }, 300);
});

onBeforeMount(() => {
  if (route.query.isOpenNewConsultation) {
    isShowCreateConsultationModal.value = true;
  }
  if (route.query.actual) {
    setActual(route.query.actual as "yes" | "no");
  }

  webinarsStore.requestLectors();
  collectionsStore.requestSpecializations();
  useRequestPayload(
    queryParams,
    async (filters) => {
      await consultationsStore.requestConsultations(filters);
      setFirstActiveChat(consultationsStore.consultations);
    },
    {},
  );
});
</script>

<template>
  <div class="question">
    <div class="question__header">
      <div class="flex justify-between justify-between">
        <h5>Вопросы</h5>
        <q-btn outline style="color: #f7b70b" class="q-btn--form q-ml-sm q-mr-sm">
          <span class="text-primary question__btn-label" @click="isShowCreateConsultationModal = true">
            Задать вопрос
          </span>
        </q-btn>
        <q-btn-toggle
          v-model="actual"
          spread
          no-caps
          toggle-color="primary"
          text-color="primary"
          :options="[
            { label: 'Актуальные', value: 'yes' },
            { label: 'Прошедшие', value: 'no' },
          ]"
          @update:model-value="setActual" />
      </div>
      <div class="question__filter">
        <q-input v-model="search" debounce="500" class="max-width" outlined placeholder="Поиск">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-input v-model="dateToString" outlined class="max-width">
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

        <q-select
          v-model="specializationId"
          input-class="q-select--form"
          label="Консультант*"
          outlined
          class="max-width"
          :options="optionsLectors"
          :option-label="(item) => item.label"
          emit-value
          map-options
          @update:model-value="setConsultant" />

        <q-select
          v-model="lectorId"
          input-class="q-select--form"
          label="Категория"
          outlined
          class="max-width"
          :options="optionsCategories"
          :option-label="(item) => item.label"
          emit-value
          map-options
          @update:model-value="setSpecialization" />
      </div>
    </div>

    <div class="question__wrapper">
      <div class="question__sidebar">
        <SideBarItem
          v-for="(item, index) in consultationsStore.consultations"
          :key="index"
          :is-active="idActiveChat === item.id"
          :item="item"
          @click="setIdActiveChat(item.id)" />
      </div>
      <div class="question__content">
        <ChatWrapper
          v-if="idActiveChatConsultation"
          :messages="idActiveChatMessages"
          :consultation="idActiveChatConsultation" />
        <div v-else>
          <h4 v-if="$route.query.actual === 'no'" class="q-pt-md">У вас нету завершенных консультаций</h4>
          <h4 v-else class="q-pt-md">Создайте новую заявку</h4>
          <p style="text-align: center" class="q-pt-md">Вы мажите задать вопрос консультанту</p>
        </div>
        <MessageInput @send-message="sendMessage" />
      </div>
    </div>

    <CreateConsultationModal
      v-if="isShowCreateConsultationModal"
      v-model:show="isShowRuleModal"
      v-model:accept="isAcceptRules"
      @close="isShowCreateConsultationModal = false" />

    <RulesModal
      v-if="isShowRuleModal"
      v-model:show="isShowRuleModal"
      v-model:accept="isAcceptRules"
      @close="isShowRuleModal = false" />
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
    padding: 15px 35px;
    background-color: $white;
    border-radius: 10px 10px 0 0;
    gap: 16px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;

    &_line {
      min-height: 80px;
      height: auto;
    }
  }

  &__filter {
    gap: 16px;
    display: flex;
    flex-wrap: nowrap;
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
    flex-direction: column;
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

.question__filter {
  &:deep(.q-field__control-container) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // max-width: 300px;
  }
}
</style>
