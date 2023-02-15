import axios from 'axios';
import { CreateUser, LoginUser } from '../../Types/types';
import { baseUrl } from '../BaseUrlApi';

function post(userData: CreateUser) {
  return axios.post(`${baseUrl}/users`, userData);
}

function login(userDataLogin: LoginUser) {
  return axios.post(`${baseUrl}/users/signin`, userDataLogin);
}

const userApi = {
  post,
  login
};

export default userApi;
