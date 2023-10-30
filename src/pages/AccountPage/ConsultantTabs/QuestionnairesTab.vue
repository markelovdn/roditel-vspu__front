<script setup lang="ts">
import { onMounted } from "vue";

import { useQuestionnairesStore } from "@/stores/questionnairesStore";

const questionnairesStore = useQuestionnairesStore();

onMounted(() => {
  //TODO: пагинация
  questionnairesStore.getQuestionnaires({ page: "1" });
});
</script>

<template>
  <div>
    <router-link :to="'/questionnaires'">
      <q-btn outline style="color: #f7b70b" class="personal-cabinet">
        <IconPersonal />
        <span class="personal-cabinet__label text-primary">Создать анкету</span>
      </q-btn>
    </router-link>
    {{ questionnairesStore.questionnaires }}
  </div>
</template>

<style lang="scss" scoped></style>
