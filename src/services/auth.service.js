import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "https://authserviceforelib.azurewebsites.net/";

const register = (firstName, lastName, emailAddress, password) => {
  let request = axios.post(API_URL + "api/User/Register", {
    firstName,
    lastName,
    emailAddress,
    password,
  });
  console.log(request);
  return request;
};

const login = (username, password) => {
  return axios
    .post(API_URL + "token", {
      username,
      password,
      "grant_type" : "grant_type"
    })
    .then((response) => {
      if (response.data) {
        const longassString = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/"
        const decoded = jwtDecode(response.data);
        const user = {
            "email" : decoded[longassString + "name"],
            "id" : decoded[longassString + "nameidentifier"],
            "role" : decoded[longassString + "role"],
            "accessToken" : response.data
        }
        localStorage.setItem("user", JSON.stringify(user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;