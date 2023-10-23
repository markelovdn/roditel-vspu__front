<script setup lang="ts">
import { ref } from "vue";

import QuestionnairesModal from "@/components/modals/QuestionnairesModal/QuestionnairesModal.vue";

const showQuestionnairesModal = ref(false);
</script>

<template>
  <div>
    <q-btn
      outline
      style="color: #f7b70b"
      class="personal-cabinet"
      @click="showQuestionnairesModal = !showQuestionnairesModal">
      <IconPersonal />
      <span class="personal-cabinet__label text-primary">Создать анкету</span>
    </q-btn>
  </div>

  <QuestionnairesModal v-if="showQuestionnairesModal" @close="showQuestionnairesModal = false"></QuestionnairesModal>
</template>

<style lang="scss" scoped></style>
