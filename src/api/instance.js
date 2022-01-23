import axios from "axios";

const instance = axios.create({
  baseURL: "https://61e7a9b2e32cd90017acbc21.mockapi.io",
  headers: {
    "Content-type": "application/json",
  },
});
export default instance;