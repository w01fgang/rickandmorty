// @flow
// eslint-disable-next-line import/prefer-default-export
export const scrollToTop = () => {
  const top = document.documentElement?.scrollTop || document.body?.scrollTop || 0;
  if (top > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, top - top / 8);
  }
};
