import type { QBtnProps } from "quasar";
import { defineComponent } from "vue";
export type GenericEmit = (event: any, ...args: any[]) => void;

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

export type ComponentDefinition = ReturnType<typeof defineComponent>;
