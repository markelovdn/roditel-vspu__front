<script setup lang="ts">
import { ref, computed } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";

import { type TLoginPayload } from "./types";
import axios from "axios";
import { useModal } from "@/hooks/useModal";
import { computedEager } from "@vueuse/core";

const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits<{
  (event: "update:show-modal" | string, value: boolean): void;
}>();

const data = ref<TLoginPayload>({
  email: "",
  password: "",
});

const isShow = computed(() => props.showModal);
const { isModalShown } = useModal(isShow, emit, data);

const isValid = ref(false);
const sendData = async (data: TLoginPayload) => {
  await axios
    .post("https://markelovdn.ru/api/login", {
      email: data.email,
      password: data.password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
    })
    .catch((errors) => {
      console.log(errors);
    });
};
</script>

<template>
  <ModalWrapper
    v-model:show-modal="isModalShown"
    header="Войти"
    >

    <div>Логин</div>

    <div class="fit q-mb-sm footer">
      <q-btn label="Вход" :disable="!isValid" class="q-btn--form" color="primary" @click="sendData(data)" />

      <q-btn
        label="Закрыть"
        class="q-ml-sm q-btn--form"
        flat
        :ripple="false"
        color="grey-1"
        @click="isModalShown = false" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 32px;
}
</style>
