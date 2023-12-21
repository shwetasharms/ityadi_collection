import axios from "axios";
import { loginApi } from "../_constants/api.constant";

export async function login(data) {
  const response = await axios.post(
    process.env.REACT_APP_AAVAZ_BIZ + loginApi.LOGIN,
    data,
  ).then(function (response) {

    // if (response.status == 200) {
    //   localStorage.setItem("auth", JSON.stringify(response.data));
    // }
    return response;
  }).catch(function (error) {
    console.log(error);
    console.log(error.response);
    return error.response;
  });
  return response;
}