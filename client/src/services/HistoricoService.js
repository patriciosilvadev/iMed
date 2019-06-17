import * as url from '../config/config.js';
import axios from 'axios';

export default {
    searchAtendimentosPatient(patient) {
    let service = url.SERVER_IP + `/historico-patient/${patient.patientid}`;
    return axios.get(service);
  },
  searchAtendimentosDoctor(doctor) {
    let service = url.SERVER_IP + `/historico-doctor/${doctor.doctorid}`;
    return axios.get(service);
  },
  searchAtendimentosNurse(nurse) {
  let service = url.SERVER_IP + `/historico-nurse/${nurse.nurseid}`;
  return axios.get(service);
}
};
 