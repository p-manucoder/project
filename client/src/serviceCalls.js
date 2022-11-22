import axios from "axios";
const serverURL = " https://khoj--server.herokuapp.com/api";
export const postRequest = async (path, data) => {
  let response = await axios.post(serverURL + path, data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      authorization:
        localStorage.getItem("khojUserToken") ||
        localStorage.getItem("khojAdminToken"),
    },
  });
  return response.data;
};
export const getRequest = async (path) => {
  let response = await axios.get(serverURL + path, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      authorization:
        localStorage.getItem("khojUserToken") ||
        localStorage.getItem("khojAdminToken"),
    },
  });
  return response.data;
};
