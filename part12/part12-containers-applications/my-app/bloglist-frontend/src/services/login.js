import axios from "axios";
let url = "/test-api/login";
if (import.meta.env.MODE === "production") {
  url = "/api/login";
}
const baseUrl = url;

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
