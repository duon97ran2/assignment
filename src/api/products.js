import instance from "./instance";

export const getAllProducts = () => {
  const url = "/products";
  return instance.get(url);
};
export const getProduct = (id) => {
  const url = `/products/${id}`;
  return instance.get(url);
};
export const addProduct = (post) => {
  const url = "/products";
  return instance.post(url, post);
};
export const updateProduct = (post, id) => {
  const url = `/products/${id}`;
  return instance.put(url, post);
};
export const removeProduct = (id) => {
  const url = `/products/${id}`;
  return instance.delete(url);
};