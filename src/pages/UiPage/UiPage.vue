<script setup lang="ts">
import useVuelidate, { type ValidationArgs } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import type { ValidationRule } from "quasar";
import { computed, ref } from "vue";

const name = ref("");
const rules = computed(() => ({
  name: {
    required,
    $autoDirty: true,
  } as ValidationArgs<Record<string, ValidationRule>>,
}));
const _$v = useVuelidate(rules, { name });
</script>

<template>
  <q-input v-model="name" :error="_$v.$error" type="text" label="Name" />
</template>

<style lang="scss" scoped></style>
