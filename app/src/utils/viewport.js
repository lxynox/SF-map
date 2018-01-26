const getViewportWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const getViewportHeight = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

export { getViewportWidth, getViewportHeight };
