import type { GenericEmit } from "@/types";
import { computed, type ComputedRef } from "vue";

export function useModal(showProp: ComputedRef<boolean>, emit: GenericEmit) {
	// const hasChanges = ref(false);
	// const forceClose = ref(false);

	// const hide = (callback?: () => void) => {
	//     if (hasChanges.value && !forceClose.value) {
	//         alert({
	//             confirm: () => {
	//                 forceClose.value = true;
	//                 hide(callback);
	//             },
	//             cancel: () => void 0,
	//         });
	//     } else {
	//         setTimeout(() => {
	//             forceClose.value = false;
	//             callback?.();
	//             emit("modal-hide");
	//         }, 100);
	//     }
	// };

	// const onHide = () => {
	//     hide();
	// };

	// const onEscape = (e: KeyboardEvent) => {
	//     if (e.key === "Escape") hide();
	// };

	//     document.addEventListener("keydown", onEscape);
	// onBeforeUnmount(() => {
	// 	document.removeEventListener("keydown", onEscape);
	// });

	const isModalShown = computed({
		get() {
			return showProp.value;
		},
		set(v: boolean) {
			emit("update:show-modal", v);
		},
	});
	return { isModalShown };
}
