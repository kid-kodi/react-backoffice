import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
//import { alertService } from "./alert";

export const FetchWrapper = () => {
  const { user } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: user ? `Bearer ${user.token}` : "",
    },
  };

  const postRequest = (url, payload = {}, options = {}) => {
    return axios
      .post(url, payload, { ...config, ...options })
      .then((resp) => resp.data)
      .catch((err) => handleResponse({ error: err.response.data }));
  };

  const putRequest = async (url, payload = {}, options = {}) => {
    const data = await axios
      .put(url, payload, { ...config, ...options })
      .then((resp) => resp.data)
      .catch((err) => ({ error: err.response.data }));
    return data;
  };

  const getRequest = async (url, options = {}) => {
    const data = await axios
      .get(url, { ...config, ...options })
      .then((resp) => resp.data)
      .catch((err) => ({ error: err.response.data }));
    return data;
  };

  const removeRequest = async (url, payload = {}, options = {}) => {
    const data = await axios
      .delete(url, payload, { ...config, ...options })
      .then((resp) => resp.data)
      .catch((err) => ({ error: err.response.data }));
    return data;
  };

  const handleResponse = (response) => {
    if (response.error && response.error.code === 11000) {
      //alertService.error("Vous etes déja enregistré");
    } else {
      //alertService.error(response.error.message);
    }
    return response;
  };

  return {
    post: postRequest,
    put: putRequest,
    remove: removeRequest,
    get: getRequest,
  };
};
