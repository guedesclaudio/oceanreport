import axios from 'axios';
import { baseUrl } from '../BaseUrlApi';
import { ConfigApi } from '../../Types/types';

function get() {
  return axios.get(`${baseUrl}/posts`);
}

function post(body: any, config: ConfigApi) {
  return axios.post(`${baseUrl}/posts`, body, config);
}

function remove(postId: number, config: ConfigApi) {
  return axios.delete(`${baseUrl}/posts/${postId}`, config);
}

const postsApi = {
  get,
  post,
  remove
};

export default postsApi;
