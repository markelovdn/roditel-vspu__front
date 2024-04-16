import { Notify, QNotifyCreateOptions } from "quasar";

export default function notify(opts: string | QNotifyCreateOptions) {
  return Notify.create(opts);
}
