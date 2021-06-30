import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getRequest = (apiPath) => {
  return axios.get(`${API_URL}${apiPath}`)
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.log(error.name);
    console.log(error.message);
    return error.code;
  });

}

export const postRequest = (apiPath) => {
  return axios.post(`${API_URL}${apiPath}`)
  .then((response) => {
    return response;
  })
  .catch((error) => {
    // handle error
    console.log('error', error);
    return error;
  });
}