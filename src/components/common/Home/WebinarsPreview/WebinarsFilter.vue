<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

import { useCollectionsStore } from "@/stores/collectionsStore";

const collectionsStore = useCollectionsStore();
const { getSpecializationsWithAll: optionsSpecializations } = storeToRefs(collectionsStore);
const specializationId = ref(0);

onMounted(() => {
  collectionsStore.requestSpecializations();
});
</script>

<template>
  <div class="filter">
    <q-select
      v-model="specializationId"
      input-class="q-select--form"
      label="Специализация*"
      outlined
      class="fit q-mb-sm"
      :options="optionsSpecializations"
      :option-label="(item) => item.label"
      emit-value
      map-options />
  </div>
</template>

<style lang="scss" scoped>
.filter {
  width: 500px;
  background-color: aliceblue;
}
</style>
