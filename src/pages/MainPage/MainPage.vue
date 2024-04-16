<script setup lang="ts">
import ConsultantsSlider from "@/components/common/Home/ConsultantsSlider/ConsultantsSlider.vue";
import HelpBanner from "@/components/common/Home/HelpBanner/HelpBanner.vue";
import MainBanner from "@/components/common/Home/MainBanner/MainBanner.vue";
import ServiceDeliveryFormat from "@/components/common/Home/ServiceDeliveryFormat/ServiceDeliveryFormat.vue";
import WebinarsPreview from "@/components/common/Home/WebinarsPreview/WebinarsPreview.vue";
</script>

<template>
  <div class="main-container">
    <MainBanner />
    <ConsultantsSlider />
    <WebinarsPreview />
    <ServiceDeliveryFormat />
    <HelpBanner />
  </div>
</template>

<style scoped></style>
