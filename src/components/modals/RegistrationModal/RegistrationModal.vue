<script setup lang="ts">
import { ref } from "vue";
import ModalWrapper from "../../ModalWrapper/ModalWrapper.vue";
import axios  from "axios";

const options: Array<string> = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
const subHeader: string = 'Введите свои данные для регистрации';
const header: string = 'Добавить данные';

const show = ref<boolean>(true);
const isPwd = ref<boolean>(true);

const data = ref<object>({
  name: ref<string>(''),
  phone: ref<string>(''),
  email: ref<string>(''),
  specialization_id: ref<number>(),
  profession_id: ref<number>(),
  password: ref<string>(''),
  password_confirmation: ref<string>(''),
})

const sentData = async (data: object) => {
      await axios.post('https://markelovdn.ru/api/register', {
        data
      }).then((response) => {
        localStorage.setItem('token', response.data.access_token)
        console.log(response.data.user)

      }).catch((errors) => {
        console.log(errors)
      })
}
</script>

<template>
  <ModalWrapper :show="show">
    <template v-slot:header>
      {{ header }}
    </template>

    <template v-slot:subHeader>
      {{ subHeader }}
    </template>
    
    <template v-slot:form>
        <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Ф.И.О.*"
        borderless
        color="primary"
        v-model="data.name"
      ></q-input>

      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Телефон*"
        mask="+7 (###) ### ####"
        borderless
        v-model="data.phone"
      ></q-input>

      <q-input
        outlined
        class="fit q-mb-sm"
        input-class="q-input--form"
        label="Почта*"
        borderless
        v-model="data.email"
      ></q-input>

      <q-select
        input-class="q-select--form"
        label="Специализация*"
        outlined
        class="fit q-mb-sm"
        :options="options"
        v-model="data.specialization_id"
      />

      <q-select
        class="fit q-mb-sm"
        input-class="q-select--form"
        label="Кем Вы являетесь*"
        outlined
        :options="options"
        v-model="data.profession_id"
      />

      <q-input
      outlined
      class="fit q-mb-sm"
      label="Пароль*"
      v-model="data.password" 
      :type="isPwd ? 'password' : 'text'"
      >
      <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
      outlined
      class="fit q-mb-sm"
      label="Подтвердите пароль*"
      v-model="data.password_confirmation" 
      :type="isPwd ? 'password' : 'text'"
      >
      <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </template>

    <template v-slot:footer>
      <q-btn 
      label="Регистрация" 
      class="q-btn--form" color="primary"
      @click="sentData(data)"
      ></q-btn>
      
      <q-btn
      label="Закрыть"
      class="q-ml-sm q-btn--form"
      flat
      :ripple="false"
      color="grey-1"
      @click="show = !show"
      ></q-btn>

    </template>
  </ModalWrapper>
</template>

<style lang="scss" scoped></style>
