<script setup lang="ts">
import { ref } from "vue";
import MainBanner from '@/components/common/Home/MainBanner/MainBanner.vue'
import ConsultantsSlider from '@/components/common/Home/ConsultantsSlider/ConsultantsSlider.vue'
import WebinarsPreview from '@/components/common/Home/WebinarsPreview/WebinarsPreview.vue'

const showModal = ref(false);
</script>

<template>
  <div class="main-container">
    <MainBanner />
    <ConsultantsSlider />
    <WebinarsPreview />

    <div>Формат оказания услуг</div>
    <div>Формат оказания услуг</div>
    <div>Help</div>
    <q-btn @click="showModal = true">show modal</q-btn>
    <RegistrationModal v-model:show-modal="showModal"></RegistrationModal>
    <p v-for="n in 15" :key="n">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae
      odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis
      voluptate?
    </p>
  </div>
</template>

<style scoped>
.main-container {
  /* padding: 0 75px; */
}
</style>
