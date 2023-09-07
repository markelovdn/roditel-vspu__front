<script setup lang="ts">
import { ref, onMounted } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import type { OptionSpecializations, TRegistrationPayload } from "./types";
import axios from "axios";

let optionsSpecializations = ref([Array<OptionSpecializations | undefined>]);

onMounted(async () => {
  await axios.get('https://markelovdn.ru/api/specializations', {
  }).then((response) => {

    optionsSpecializations.value = response.data.data.map((item: OptionSpecializations) => {
      return { label: item.title, value: item.id, cannotSelect: true }
    })
    console.log(optionsSpecializations)

  }).catch((errors) => {
    console.log(errors)
  })
})


const subHeader: string = 'Введите свои данные для регистрации';
const header: string = 'Добавить данные';

const show = ref<boolean>(true);
const isPwd = ref<boolean>(true);
const selectInput = ref<any>();

const data = ref<TRegistrationPayload>({
  firstName: "",
  secondName: "",
  surName: "",
  phone: "",
  email: "",
  specializationId: 0,
  professionId: 0,
  password: ""
});


const sendData = async (data: TRegistrationPayload) => {
  await axios.post('https://markelovdn.ru/api/register', {
    data
  }).then((response) => {
    localStorage.setItem('token', response.data.access_token)
    console.log(response.data.user)

  }).catch((errors) => {
    console.log(errors)
  })
}

function updateData(params: any) {
  data.value.specializationId = params.value
}

</script>

<template>
  <ModalWrapper :show="show">
    <template v-slot:header>
      {{ header }}
    </template>

    <template v-slot:subHeader>
      {{ subHeader }}
      <!-- {{ optionsSpecializations }} -->
    </template>

    <template v-slot:form>

      <q-select input-class="q-select--form" label="Специализация*" outlined class="fit q-mb-sm"
        :options="optionsSpecializations" @update:modelValue="updateData" v-model="selectInput" />

      <q-input outlined class="fit q-mb-sm" input-class="q-input--form" label="Ф.И.О.*" borderless color="primary"
        v-model="data.firstName"></q-input>

      <q-input outlined class="fit q-mb-sm" input-class="q-input--form" label="Телефон*" mask="+7 (###) ### ####"
        borderless v-model="data.phone"></q-input>

      <q-input outlined class="fit q-mb-sm" input-class="q-input--form" label="Почта*" borderless
        v-model="data.email"></q-input>

      <q-select class="fit q-mb-sm" input-class="q-select--form" label="Кем Вы являетесь*" outlined :options="options"
        v-model="data.professions" />

      <q-input outlined class="fit q-mb-sm" label="Пароль*" v-model="data.password" :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>

      <q-input outlined class="fit q-mb-sm" label="Подтвердите пароль*" model-value=""
        :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
        </template>
      </q-input>
    </template>

    <template v-slot:footer>
      <q-btn label="Регистрация" class="q-btn--form" color="primary" @click="sendData(data)"></q-btn>

      <q-btn label="Закрыть" class="q-ml-sm q-btn--form" flat :ripple="false" color="grey-1"
        @click="show = !show"></q-btn>

    </template>
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>
