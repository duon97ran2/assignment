import instance from "./instance";

export const getAllCategories = () => {
  const url = "/categories";
  return instance.get(url);
};
export const getCategory = (id) => {
  const url = `/categories/${id}`;
  return instance.get(url);
};
export const addCategory = (post) => {
  const url = "/categories";
  return instance.post(url, post);
};
export const updateCategory = (post, id) => {
  const url = `/categories/${id}`;
  return instance.put(url, post);
};
export const removeCategory = (id) => {
  const url = `/categories/${id}`;
  return instance.delete(url);
};