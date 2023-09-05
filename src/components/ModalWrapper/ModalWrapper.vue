<script setup lang="ts">
import { uuid } from "@/utils/uuidv4";
import { computed, type ComputedRef, nextTick, onBeforeUnmount, ref, watch } from "vue";

const emit = defineEmits<{
  (event: "modal-hide", key?: string): void;
}>();
const props = defineProps({ show: Boolean });
const hasChanges = ref(false);
const forceClose = ref(false);
const modalKey = uuid();

const hide = (callback?: () => void) => {
  if (hasChanges.value && !forceClose.value) {
    alert({
      confirm: () => {
        forceClose.value = true;
        hide(callback);
      },
      cancel: () => void 0,
    });
  } else {
    setTimeout(() => {
      forceClose.value = false;
      callback?.();
      emit("modal-hide", modalKey);
    }, 100);
  }
};

const onHide = () => {
  hide();
};

const onEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") hide();
};

document.addEventListener("keydown", onEscape);

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onEscape);
});

const transitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"],
};

const position: ComputedRef<"left" | "right" | "bottom" | "top" | "standard"> = computed(() => {
  //   if ($q.screen.lt.md) {
  //     return "right";
  //   }
  return "standard";
});

const transitionState = ref(false);

const transitionShow = computed(() => "q-transition--" + transitions[position.value][0]);

const transitionHide = computed(() => "q-transition--" + transitions[position.value][1]);

const transition = computed(() => (transitionState.value === true ? transitionHide.value : transitionShow.value));

const transitionStyle = "--q-transition-duration: 300ms";

watch(
  () => props.show,
  (val) => {
    nextTick(() => {
      transitionState.value = val;
    });
  },
);
</script>

<template>
  <Teleport to="body">
    <q-dialog :modelValue="show">
      <q-card class="dialog-card">
        <div class="dialog-card__header">
          <slot name="header" />
        </div>
        <div class="dialog-card__sub-header">
          <slot name="subHeader" />
        </div>
        <slot name="form" class="dialog-card__form" @change="hasChanges = true" @hide="onHide" wrapper-class="flex-column-h100" />

        <div class="dialog-card__footer">
          <slot name="footer" />
        </div>
      </q-card>
    </q-dialog>
  </Teleport>
</template>

<style lang="scss" scoped>
.dialog-card {
  padding: 69px 63px 69px 63px;
  width: 476px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column  ;
  background-color: $background-secondary;

  &__header {
    margin-bottom: 24px !important;
  }

  &__sub-header {
    margin-bottom: 24px !important;
  }

  &__form {
    width: 343px;
  }

  &__footer {
    margin-top: 32px;
  }
}
</style>
