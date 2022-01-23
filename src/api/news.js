import instance from "./instance";

export const getAll = () => {
  const url = "/news";
  return instance.get(url);
};
export const get = (id) => {
  const url = `/news/${id}`;
  return instance.get(url);
};
export const add = (post) => {
  const url = "/news";
  return instance.post(url, post);
};
export const update = (post, id) => {
  const url = `/news/${id}`;
  return instance.put(url, post);
};
export const remove = (id) => {
  const url = `/news/${id}`;
  return instance.delete(url);
};