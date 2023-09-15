<script setup lang="ts">
import { ref } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import { type TLoginPayload } from "./types";
import axios from "axios";
import { useModal } from "@/hooks/useModal";
import {
  useValidation,
  requiredValidator,
  emailValidator,
} from "@/hooks/useValidation";

const emit = defineEmits(["close"]);

const data = ref<TLoginPayload>({
  email: "",
  password: "",
});

const { closeModal } = useModal(emit, data);

const isPwd = ref(true);

const { handleBlur, $v, getErrorAttrs } = useValidation<TLoginPayload>(data, emit, {
  email: { requiredValidator, emailValidator },
  password: { requiredValidator },
});

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
  <ModalWrapper header="Войти">

    <q-form class="fit q-mb-sm form">
    <q-input
      outlined
      class="fit q-mb-sm"
      input-class="q-input--form"
      label="Почта*"
      borderless
      v-bind="getErrorAttrs('email')"
      @blur="handleBlur('email')"
      v-model="data.email" />

    <q-input
      outlined
      class="fit q-mb-sm"
      label="Пароль*"
      v-bind="getErrorAttrs('password')"
      @blur="handleBlur('password')"
      aria-autocomplete="new-password"
      v-model="data.password"
      :type="isPwd ? 'password' : 'text'">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>

  </q-form>
    <div class="fit q-mb-sm footer">
      <q-btn label="Регистрация" :disable="!$v.$dirty" class="q-btn--form" color="primary" @click="sendData(data)" />
      <q-btn label="Закрыть" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1" @click="closeModal" />
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 32px;
}
</style>
