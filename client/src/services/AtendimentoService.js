import * as url from '../config/config.js';
import axios from 'axios';

export default {
  getPatientsAtendimento() {
    let service = url.SERVER_IP + '/patients-atendimento';
    return axios.get(service);
  },
  createAtendimento(atendimento) {
    let service = url.SERVER_IP + '/atendimento';
    return axios.post(service, atendimento);
  }
};
