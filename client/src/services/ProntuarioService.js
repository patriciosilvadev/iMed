import * as url from '../config/config.js';
import axios from 'axios';

export default {
  getPatientsTriagem() {
    let service = url.SERVER_IP + '/patients-triagem';
    return axios.get(service);
  }
};
