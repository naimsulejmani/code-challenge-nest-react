import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUsers = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getUserActivity = (id) => {
  return axios.get(API_URL + `users/${id}/activity`, { headers: authHeader() });
}

const deleteUserById = (id) => {
  return axios.delete(API_URL + `users/${id}`, {
    headers: authHeader(),
  });
};


export default {
  getPublicContent,
  getUsers,
  deleteUserById,
  getUserActivity,
};
