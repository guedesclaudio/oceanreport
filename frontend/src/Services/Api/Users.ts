import axios from 'axios';
import { CreateUser, LoginUser, LoginOAuth, ConfigApi } from '../../Types/types';
import { baseUrl } from '../BaseUrlApi';

function post(userData: CreateUser) {
  return axios.post(`${baseUrl}/users`, userData);
}

function login(userDataLogin: LoginUser) {
  return axios.post(`${baseUrl}/users/signin`, userDataLogin);
}

function oAuth(userDataOAuth: LoginOAuth) {
  return axios.post(`${baseUrl}/users/signin/oauth`, userDataOAuth);
}

function getAccountInformations(config: ConfigApi) {
  return axios.get(`${baseUrl}/users/account`, config);
}

function postAccountInformations(data: any, config: ConfigApi) {
  console.log(data, 'final data ##');
  return axios.post(`${baseUrl}/users/account/update`, data, config);
}

const userApi = {
  post,
  login,
  oAuth,
  getAccountInformations,
  postAccountInformations
};

export default userApi;
