import * as url from '../config/config.js';
import axios from 'axios';

export default {
  getPatientsAtendimento() {
    let service = url.SERVER_IP + '/patients-atendimento';
    return axios.get(service);
  },
  endAtendimento(atendimento) {
    let service = url.SERVER_IP + `/atendimento/${atendimento.treatmentid}`;
    return axios.put(service, atendimento);
  },
  gerarAtendimento(atendimento) {
    let service = url.SERVER_IP + '/gerar-atendimento';
    return axios.post(service, atendimento);
  },
  getAtendimento(patient) {
    let service = url.SERVER_IP + `/atendimento/${patient.personid}`;
    return axios.get(service);
  }
};
