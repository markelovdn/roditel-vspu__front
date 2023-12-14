import { nextTick } from "vue";

export const useScrollToTop = () => {
  const scrollToTop = () => {
    nextTick(() => {
      window.scrollTo({ top: 0 });
    });
  };

  return { scrollToTop };
};
