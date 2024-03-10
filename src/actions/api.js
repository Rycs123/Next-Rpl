import axios from "axios";

const getAuthorizationHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};
};

const api = (method, url, data = {}, headers = {}) =>
  axios.request({
    baseURL: "https://oprec-api.labse.in/api",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
      ...headers,
    },
    method,
    url,
    data,
  });

const auth = (url, data) => {
  return api("POST", url, data);
};

const getTasks = (url) => {
  return api("GET", url, {}, getAuthorizationHeader());
};

const addTask = (url, data) => api("POST", url, data, getAuthorizationHeader());

const updateTask = (url, data) =>
  api("PUT", url, data, getAuthorizationHeader());

const deleteTask = (url) => api("DELETE", url, getAuthorizationHeader());

export default {
  auth,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
