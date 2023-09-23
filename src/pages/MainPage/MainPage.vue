<script setup lang="ts">
import { ref } from "vue";
import MainBanner from '@/components/common/Home/MainBanner/MainBanner.vue'
import ConsultantsSlider from '@/components/common/Home/ConsultantsSlider/ConsultantsSlider.vue'
import WebinarsPreview from '@/components/common/Home/WebinarsPreview/WebinarsPreview.vue'
import ServiceDeliveryFormat from '@/components/common/Home/ServiceDeliveryFormat/ServiceDeliveryFormat.vue'
import HelpBanner from '@/components/common/Home/HelpBanner/HelpBanner.vue'
import ShortProgramModal from '@/components/modals/WebinarModal/ShortProgram.vue'


const showProgramModal = ref(false);
const showModal = ref(false);
</script>

<template>
  <div class="main-container">
    <MainBanner />
    <ConsultantsSlider />
    <WebinarsPreview />
    <ServiceDeliveryFormat />

    <HelpBanner />

    <ShortProgramModal v-if="showProgramModal" @close="showProgramModal = !showProgramModal"></ShortProgramModal>

    <q-btn @click="showModal = true">show modal</q-btn>
    <RegistrationModal v-model:show-modal="showModal"></RegistrationModal>

  </div>
</template>

<style scoped>
.main-container {
  /* padding: 0 75px; */
}
</style>
