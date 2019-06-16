import * as url from '../config/config.js';
import axios from 'axios';

export default {
  getPatientsProcedimento() {
    let service = url.SERVER_IP + '/patients-procedimento';
    return axios.get(service);
  },
  createProcedimento(procedimento) {
    let service = url.SERVER_IP + '/procedimento';
    return axios.post(service, procedimento);
  },
  getProcedimento(patient) {
    let service = url.SERVER_IP + `/procedimento/${patient.personid}`;
    return axios.get(service);
  },
  setProcedimento(procedimento) {
    let service = url.SERVER_IP + `/procedimento/${procedimento.procedureid}`;
    return axios.put(service, procedimento);
  }
};
