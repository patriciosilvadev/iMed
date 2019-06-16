import * as url from '../config/config.js';
import axios from 'axios';

export default {
  getPatientsTriagem() {
    let service = url.SERVER_IP + '/patients-triagem';
    return axios.get(service);
  },
  createProntuario(prontario) {
    let service = url.SERVER_IP + '/prontuario';
    return axios.post(service, prontario);
  },
  getProntuario(patient) {
    let service = url.SERVER_IP + `/prontuario/${patient.personid}`;
    return axios.get(service);
  }
};
