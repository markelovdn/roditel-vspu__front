<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { TWebinarData, TWebinarPayload } from "@/api/Webinars/types";
import TheSetWebinar from "@/components/common/SetWebinar/TheSetWebinar.vue";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
const router = useRouter();
const webinar = ref<TWebinarData>();

const handleUpdateWebinar = (event: TWebinarPayload) => {
  webinarsStore.updateWebinar(Number(router.currentRoute.value.params.id), event);
  router.push({ name: "My", query: { tabId: "webinars" } });
};

onMounted(async () => {
  await webinarsStore.showWebinar(Number(router.currentRoute.value.params.id));
  webinar.value = webinarsStore.webinar;
  console.log(webinar.value);
});
</script>

<template>
  <TheSetWebinar :webinar-item="webinar" @set-webinar="handleUpdateWebinar" />
</template>

<style lang="scss" scoped></style>
