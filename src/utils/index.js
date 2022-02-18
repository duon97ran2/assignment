export const $ = (element) => {
  const selectors = document.querySelectorAll(element);
  return selectors.length === 1 ? selectors[0] : selectors;
};