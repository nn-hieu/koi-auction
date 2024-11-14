// services/loginService.js
import axiosInstance from "@/config/axios";

const API_URL = "http://localhost:8080/signup";

export const register = async (firstname: string, lastname: string, email: string, username: string, password: string, address: string) => {
   console.log(firstname, lastname, email, username, password);

   const response = await axiosInstance.post(API_URL, {
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: password,
      address: address
   });

};
