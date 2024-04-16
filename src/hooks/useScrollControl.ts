import { scroll } from "quasar";

const { getScrollTarget, setVerticalScrollPosition } = scroll;

export function useScrollControl() {
  const duration = 300;

  const scrollToTop = (speed = 0) => {
    const target = document.querySelector(".scroll") as Element;
    setVerticalScrollPosition(target, 0, speed);
  };

  const scrollToElement = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      const htmlElement = element as HTMLElement;
      const target = getScrollTarget(htmlElement);
      const offset = htmlElement.offsetTop;
      setVerticalScrollPosition(target, offset, duration);
    }
  };

  return { scrollToTop, scrollToElement };
}
