<script setup lang="ts">
import { mdiClose } from "@quasar/extras/mdi-v6";
import { computed, type ComputedRef } from "vue";

const emit = defineEmits(["close"]);

defineProps<{
  header?: string;
  subHeader?: string;
  closeButtonHeader?: boolean;
  fullWidth?: boolean;
}>();

const position: ComputedRef<"left" | "right" | "bottom" | "top" | "standard"> = computed(() => {
  //   if ($q.screen.lt.md) {
  //     return "right";
  //   }
  return "standard";
});
</script>

<template>
  <Teleport to="body">
    <q-dialog :position="position" :persistent="true" :model-value="true" :attrs="$attrs" basic>
      <q-card class="dialog-card" basic :style="fullWidth && 'max-width: 80vw'">
        <div v-if="closeButtonHeader" class="fit absolute-top q-pt-md q-pr-md">
          <q-icon :name="mdiClose" class="float-right cursor-pointer close" @click="emit('close')" />
        </div>
        <slot name="header">
          <div v-if="header" class="dialog-card__header">
            <h4>
              {{ header }}
            </h4>
          </div>
        </slot>
        <slot name="subHeader">
          <div v-if="subHeader" class="dialog-card__sub-header">
            <span class="sub-header__text">
              {{ subHeader }}
            </span>
          </div>
        </slot>

        <slot wrapper-class="flex-column-h100" />
      </q-card>
    </q-dialog>
  </Teleport>
</template>

<style lang="scss" scoped>
.dialog-card {
  padding: 35px;
  background-color: $background-secondary;
  overflow-y: auto;
  overflow-x: hidden;

  &__header {
    margin-bottom: 24px !important;
  }

  &__sub-header {
    margin-bottom: 24px !important;
    display: flex;
    justify-content: center;

    &__text {
      color: $Text-color;
      line-height: 18px;
      font-weight: 500;
      font-size: 14px;
    }
  }
}

.close {
  font-size: 20px;
  color: $grey-2;
}
</style>
