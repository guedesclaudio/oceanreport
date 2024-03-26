import axios from 'axios';
import { baseUrl } from '../BaseUrlApi';

function get() {
  return axios.get(`${baseUrl}/posts`);
}

function post(body: any, config: any) {
  console.log(body, 'body')
  return axios.post(`${baseUrl}/posts`, body, config);
}

function remove(postId: any, config: any) {
  return axios.delete(`${baseUrl}/posts/${postId}`, config);
}

const postsApi = {
  get,
  post,
  remove
};

export default postsApi;
