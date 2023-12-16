<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

import { TWebinarsRequestOption } from "@/api/Webinars/types";
import { useWebinarsStore } from "@/stores/webinarsStore";

const emit = defineEmits<{
  (e: "setFilters", filters: TWebinarsRequestOption): void;
}>();

const webinarsStore = useWebinarsStore();
const { getWebinarCategoriesWithAll: optionsCategories } = storeToRefs(webinarsStore);
const specializationId = ref(0);

const filters = ref<TWebinarsRequestOption>({ page: 1 });
const date = ref();
const dateToString = computed(() => (date.value ? `c ${date.value.from} по ${date.value.to}` : "Выберите дату"));
const dateClear = () => {
  date.value = null;
  setData();
};
const setSpecialization = (value: string) => {
  filters.value.category = Number(value);
  emit("setFilters", filters.value);
};
const setData = (value?: any) => {
  if (value) {
    filters.value.dateBetween = `${value.from}, ${value.to}`;
  } else {
    delete filters.value["dateBetween"];
  }
  emit("setFilters", filters.value);
};
onMounted(() => {
  webinarsStore.requestWebinarCategories();
});
</script>

<template>
  <div class="filter">
    <div style="max-width: 300px" class="q-pr-md">
      <q-input v-model="dateToString" outlined>
        <template #append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="date" range @update:model-value="setData">
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
    <q-select
      v-model="specializationId"
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
</template>

<style lang="scss" scoped>
.filter {
  display: flex;
  // width: 500px;
}
</style>
