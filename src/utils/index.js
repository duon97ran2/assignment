import { changeProduct, getProductDiscount } from "../api/products";

export const $ = (element) => {
  const selectors = document.querySelectorAll(element);
  return selectors.length === 1 ? selectors[0] : selectors;
};
export const priceLoad = (price, discount) => ((price) * ((100 - discount) / 100));
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};
export const discountChange = async () => {
  const { data } = await getProductDiscount();
  data.slice(0, 4).forEach((item) => {
    changeProduct({ discount: getRandomInt(15, 25) }, item.id);
  });
};