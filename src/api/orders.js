import instance from "./instance";

export const getAllOrders = () => {
  const url = "/orders";
  return instance.get(url);
};
export const getOrder = (id) => {
  const url = `/orders/${id}`;
  return instance.get(url);
};
export const addOrder = (post) => {
  const url = "/orders";
  return instance.post(url, post);
};
export const updateOrder = (post, id) => {
  const url = `/orders/${id}`;
  return instance.patch(url, post);
};
export const removeOrder = (id) => {
  const url = `/orders/${id}`;
  return instance.delete(url);
};