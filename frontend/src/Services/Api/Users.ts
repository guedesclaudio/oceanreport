import axios from 'axios';
import { CreateUser, LoginUser, LoginOAuth } from '../../Types/types';
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

const userApi = {
  post,
  login,
  oAuth
};

export default userApi;
