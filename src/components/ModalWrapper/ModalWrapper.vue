<script setup lang="ts">
import { useModal } from "@/hooks/useModal";
import { computed, type ComputedRef } from "vue";

const props = defineProps({
	showModal: Boolean,
	header: {
		type: String,
		required: false,
	},
	subHeader: {
		type: String,
		required: false,
	},
});

const emit = defineEmits<{
	(event: "update:show-modal" | string, value: boolean): void;
}>();

const position: ComputedRef<"left" | "right" | "bottom" | "top" | "standard"> = computed(() => {
	//   if ($q.screen.lt.md) {
	//     return "right";
	//   }
	return "standard";
});

const isShow = computed(() => props.showModal);
const { isModalShown } = useModal(isShow, emit);
</script>

<template>
	<Teleport to="body">
		<q-dialog :position="position" v-model="isModalShown" :attrs="$attrs" basic>
			<q-card class="dialog-card" basic>
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
	padding: 70px 62px 70px 62px;
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
