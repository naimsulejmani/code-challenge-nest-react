import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

const register = ( email,name,surname,birthdate, password) => {
  return axios.post(API_URL + "signup", {
    email,name,surname,birthdate,
    password,
  });
};

const recovery = (email) => {
  return axios.post(API_URL + "recovery", { email: email });
}

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      console.log(response)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return;
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const user = parseJwt(accessToken);
  
  return { ...user,accessToken };
};


const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};





export default {
  register,
  login,
  logout,
  getCurrentUser,
  recovery,
};
