import { scroll } from "quasar";

const { getScrollTarget, setVerticalScrollPosition } = scroll;

export const useScrollControl = () => {
  const duration = 500;

  const scrollToTop = () => {
    const target = document.querySelector(".scroll") as Element;
    setVerticalScrollPosition(target, 0, duration);
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
};
