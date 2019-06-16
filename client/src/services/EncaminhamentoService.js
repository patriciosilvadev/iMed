import * as url from '../config/config.js';
import axios from 'axios';

export default {
  createEncaminhamento(encaminhamento) {
    let service = url.SERVER_IP + '/encaminhamento';
    return axios.post(service, encaminhamento);
  }
};
