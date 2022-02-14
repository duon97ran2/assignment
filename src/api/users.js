import instance from "./instance";

export const getAllUsers = () => {
  const url = "/users";
  return instance.get(url);
};
export const getUser = (id) => {
  const url = `/users/${id}`;
  return instance.get(url);
};
export const addUser = (post) => {
  const url = "/users";
  return instance.post(url, post);
};
export const updateUser = (post, id) => {
  const url = `/users/${id}`;
  return instance.patch(url, post);
};
export const removeUser = (id) => {
  const url = `/users/${id}`;
  return instance.delete(url);
};
export const signup = (user) => {
  const url = "/signup";
  return instance.post(url, user);
};
export const signin = (user) => {
  const url = "/signin";
  return instance.post(url, user);
};