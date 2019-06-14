import * as url from '../config/config.js';
import axios from 'axios';

export default {
  createReceptionist(patient) {
    let service = url.SERVER_IP + '/receptionist';
    return axios.post(service, patient);
  },
  createDoctor(patient) {
    let service = url.SERVER_IP + '/doctor';
    return axios.post(service, patient);
  },
  createNurse(patient) {
    let service = url.SERVER_IP + '/nurse';
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
  getDoctors() {
    let service = url.SERVER_IP + '/doctor';
    return axios.get(service);
  },
  getNurses() {
    let service = url.SERVER_IP + '/nurse';
    return axios.get(service);
  },
  getReceptionists() {
    let service = url.SERVER_IP + '/receptionist';
    return axios.get(service);
  }
};
