import instance from "./instance";

export const signup = (user) => {
  const url = "/signup";
  instance.post(url, user);
};
export const signin = (user) => {
  const url = "/signin";
  instance.post(url, user);
};