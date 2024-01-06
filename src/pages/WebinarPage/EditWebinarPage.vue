<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { TWebinarPayload } from "@/api/Webinars/types";
import TheSetWebinar from "@/components/common/SetWebinar/TheSetWebinar.vue";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
const router = useRouter();
const isLoading = ref(false);

const handleUpdateWebinar = (event: TWebinarPayload) => {
  webinarsStore.updateWebinar(Number(router.currentRoute.value.params.id), event);
  router.push({ name: "My", query: { tabId: "webinars" } });
};

onMounted(async () => {
  await webinarsStore.showWebinar(Number(router.currentRoute.value.params.id));
  webinarsStore.webinar;
  isLoading.value = true;
});
</script>

<template>
  <TheSetWebinar v-if="isLoading" :webinar-item="webinarsStore.webinar" @set-webinar="handleUpdateWebinar" />
</template>

<style lang="scss" scoped></style>
