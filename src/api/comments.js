import instance from "./instance";

export const getAllComments = () => {
  const url = "/comments";
  return instance.get(url);
};
export const getComment = (id) => {
  const url = `/comments/${id}`;
  return instance.get(url);
};
export const addComment = (post) => {
  const url = "/comments";
  return instance.post(url, post);
};
export const updateComment = (post, id) => {
  const url = `/comments/${id}`;
  return instance.put(url, post);
};
export const removeComment = (id) => {
  const url = `/comments/${id}`;
  return instance.delete(url);
};
export const getCommentProducts = (id) => {
  const url = `/comments/${id}?_embed=products`;
  return instance.get(url);
};