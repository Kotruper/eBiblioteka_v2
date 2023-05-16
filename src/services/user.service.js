import axios from "axios";
import authHeader from "./auth-header";
import jwtDecode from "jwt-decode";

const API_URL = "https://bookserviceforelib.azurewebsites.net/api";

const getPublicContent = () => {
  return axios.get(API_URL + "/Author");
};

const getBooks = () => {
  return axios.get(API_URL + "/Book");
};

const getCategories = () => {
  return axios.get(API_URL + "/Category");
};

const getTags = () => {
  return axios.get(API_URL + "/Tag");
};

const getAuthors = () => {
  return axios.get(API_URL + "/Author");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

/*const saveUser = (token) =>{
    decoded = jwtDecode(token);
    localStorage.setItem("user", JSON.stringify(response.data));
}*/

const UserService = {
  getPublicContent,
  getBooks,
  getCategories,
  getTags,
  getAuthors,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
