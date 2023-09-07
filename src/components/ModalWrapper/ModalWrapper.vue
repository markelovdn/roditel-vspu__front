<script setup lang="ts">
import { uuid } from "@/utils/uuidv4";
import { computed, type ComputedRef, nextTick, onBeforeUnmount, ref, watch } from "vue";

const emit = defineEmits<{
  (event: "modal-hide", key?: string): void;
}>();
const props = defineProps({ 
  show: Boolean,
  header: String,
  subHeader: String
});
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
      <q-dialog :modelValue="show" :attrs="$attrs" basic>
      <q-card class="dialog-card" basic>
        <div class="dialog-card__header">
          <h4>
            {{ header }}
          </h4>
        </div>
        <div class="dialog-card__sub-header">
          <span class="sub-header__text">
            {{ subHeader}}
          </span>
        </div>
        <slot
          @change="hasChanges = true"
          @hide="onHide"
          wrapper-class="flex-column-h100"
        />
      </q-card>
    </q-dialog>    
  </Teleport>
</template>

<style lang="scss" scoped>
.dialog-card {
  padding: 69px 63px 69px 63px;
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
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: $Text-color;
    }
  }
}
</style>
