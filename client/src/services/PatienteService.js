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
  editPatient(patient) {
    let service = url.SERVER_IP + `/patient/${patient.patienid}`;
    return axios.put(service, patient);
  },
  getPatients() {
    let service = url.SERVER_IP + '/patient';
    return axios.get(service);
  },
  getPatientsTriagem() {
    let service = url.SERVER_IP + '/patients-triagem';
    return axios.get(service);
  }
};
