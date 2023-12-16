import { scroll } from "quasar";
const { setVerticalScrollPosition } = scroll;

export function scrollToTop() {
  setVerticalScrollPosition(window, 0, 500);
}
