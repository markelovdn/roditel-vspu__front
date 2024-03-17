import { Dialog } from "quasar";

import type { AlertDialog } from "@/types";

const getDefaultOptions = () => ({
  title: "Вы уверены, что хотите продолжить?",
  message: "Все изменения будут потеряны",
  persistent: true,
  ok: {
    label: "Продолжить",
  },
  cancel: {
    label: "Отмена",
    color: "white",
    textColor: "black",
  },
});

export default function useAlert() {
  const defaultOptions = getDefaultOptions();
  return ({ options = defaultOptions, confirm, cancel }: AlertDialog<unknown>) =>
    Dialog.create({
      ...options,
    })
      .onOk(() => {
        typeof confirm === "function" && confirm();
      })
      .onCancel(() => {
        typeof cancel === "function" && cancel();
      });
}
