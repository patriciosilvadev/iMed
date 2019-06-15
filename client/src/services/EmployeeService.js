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
  searchReceptionist(cpf) {
    let service = url.SERVER_IP + `/receptionist/${cpf}`;
    return axios.get(service);
  },
  editReceptionist(patient) {
    let service = url.SERVER_IP + `/receptionist/${patient.personid}`;
    return axios.put(service, patient);
  },
  searchDoctor(cpf) {
    let service = url.SERVER_IP + `/doctor/${cpf}`;
    return axios.get(service);
  },
  editDoctor(patient) {
    let service = url.SERVER_IP + `/doctor/${patient.personid}`;
    return axios.put(service, patient);
  },
  searchNurse(cpf) {
    let service = url.SERVER_IP + `/nurse/${cpf}`;
    return axios.get(service);
  },
  editNurse(patient) {
    let service = url.SERVER_IP + `/nurse/${patient.personid}`;
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
