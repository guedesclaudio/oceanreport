import axios from 'axios';
import { baseUrl } from '../BaseUrlApi';

function get() {
  return axios.get(`${baseUrl}/report`);
}

const reportApi = {
  get,
};

export default reportApi;
