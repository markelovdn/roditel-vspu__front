import type { QBtnProps } from "quasar";

export type GenericEmit = (event: string, ...args: any[]) => void;

export interface AlertDialogOptions {
	title: string;
	message: string;
	cancel?: QBtnProps;
	persistent?: boolean;
	ok?: QBtnProps;
}

export interface AlertDialog<T> {
	options?: AlertDialogOptions;
	confirm: () => void;
	cancel: () => void;
	actions?: T[];
}
