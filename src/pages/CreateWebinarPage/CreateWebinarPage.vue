<script setup lang="ts">
import { useRouter } from "vue-router";

import { TWebinarPayload } from "@/api/Webinars/types";
import TheSetWebinar from "@/components/common/SetWebinar/TheSetWebinar.vue";
import { useWebinarsStore } from "@/stores/webinarsStore";

const webinarsStore = useWebinarsStore();
const router = useRouter();

const handleCreateWebinar = (event: TWebinarPayload) => {
  webinarsStore.addWebinar(event);
  router.push({ name: "My", query: { tabId: "webinars" } });
};
</script>

<template>
  <TheSetWebinar @set-webinar="handleCreateWebinar" />
</template>

<style lang="scss" scoped></style>
