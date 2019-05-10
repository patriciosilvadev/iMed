import * as url from '../config/config.js';
import axios from 'axios';

export default {
  createPatient(patient) {
    let service = url.SERVER_IP + '/patient';
    return axios.post(service, patient);
  },
  searchPatient(cpf) {
    let service = url.SERVER_IP + `/patient/${cpf}`;
    return axios.get(service);
  },
  editPatient(cpf, patient) {
    let service = url.SERVER_IP + `/patient/${cpf}`;
    return axios.put(service, patient);
  }
};
