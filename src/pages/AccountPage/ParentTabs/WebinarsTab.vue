<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { TWebinarsRequestOption } from "@/api/Webinars/types";
import WebinarCard from "@/components/common/Home/WebinarCard/WebinarCard.vue";
import TableWrapper from "@/components/TableWrapper/TableWrapper.vue";
import { useRequestPayload } from "@/hooks/useRequestPayload";
import { useScrollControl } from "@/hooks/useScrollControl";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
const route = useRoute();
const { getWebinarCategoriesWithAll: optionsCategories, getWebinarLectorsWithAll: optionsLectors } =
  storeToRefs(webinarsStore);

const { scrollToTop } = useScrollControl();

const setPage = (page: number) => {
  queryParams.value.page = page;
  scrollToTop(300);
};
const paginationPage = ref(1);
const inputDate = ref();
const search = ref();
const specializationId = ref(0);
const lectorId = ref(0);
const actual = ref<"yes" | "no">((route.query.actual as "yes" | "no") || "yes");
const queryParams = ref<TWebinarsRequestOption>({ page: 1, actual: actual.value });
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
const setActual = (value: "yes" | "no") => {
  queryParams.value.actual = value;
};

let searchTimeoutId: ReturnType<typeof setTimeout>;
watch(search, () => {
  clearTimeout(searchTimeoutId);
  searchTimeoutId = setTimeout(() => {
    queryParams.value.searchField = search.value;
  }, 300);
});
onMounted(() => {
  webinarsStore.requestWebinarCategories();
  webinarsStore.requestLectors();
  useRequestPayload(queryParams, webinarsStore.requestWebinars, {});
});
</script>

<template>
  <div>
    <TableWrapper :items="webinarsStore.webinars" :cards-list="true" :title="'Вебинары'">
      <template #header_right>
        <div>
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
      </template>
      <template #filters>
        <div class="flex">
          <div class="q-pa-md" style="width: 250px">
            <q-input v-model="search" debounce="500" outlined placeholder="Поиск">
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="q-pa-md" style="max-width: 200px">
            <q-input v-model="dateToString" outlined>
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
          <div class="q-pa-md" style="width: 200px">
            <q-select
              v-model="specializationId"
              input-class="q-select--form"
              label="Лектор*"
              outlined
              class="fit"
              :options="optionsLectors"
              :option-label="(item) => item.label"
              emit-value
              map-options
              @update:model-value="setLectors" />
          </div>
          <div class="q-pa-md" style="width: 250px">
            <q-select
              v-model="lectorId"
              input-class="q-select--form"
              label="Специализация*"
              outlined
              class="fit"
              :options="optionsCategories"
              :option-label="(item) => item.label"
              emit-value
              map-options
              @update:model-value="setSpecialization" />
          </div>
        </div>
      </template>
      <template #item="{ item }">
        <WebinarCard :item="item" />
      </template>
      <template #pagination>
        <div class="q-pa-lg">
          <div class="q-gutter-md">
            <q-pagination
              v-model="paginationPage"
              :max="webinarsStore.page.max || 1"
              :max-pages="6"
              direction-links
              gutter="8px"
              active-color="yellow"
              @update:model-value="setPage" />
          </div>
        </div>
      </template>
    </TableWrapper>
  </div>
</template>

<style lang="scss" scoped></style>
