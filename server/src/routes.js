const express = require('express');
const controllers = require('./app/controllers');
const routes = express.Router();
// const path = require('path');

routes.get('/create-tables', controllers.TablesController.createEncaminhamento);

routes.post('/patient', controllers.PatientController.insertPatient);
routes.get('/patient', controllers.PatientController.getPatients);
routes.get('/patient/:cpf', controllers.PatientController.getPatient);
routes.put('/patient/:cpf', controllers.PatientController.editPatient);

routes.post('/receptionist', controllers.EmployeeController.insertReceptionist);
routes.get('/receptionist', controllers.EmployeeController.getReceptionists);
routes.get(
  '/receptionist/:cpf',
  controllers.EmployeeController.getReceptionist
);
routes.put(
  '/receptionist/:cpf',
  controllers.EmployeeController.editReceptionist
);
routes.post('/doctor', controllers.EmployeeController.inserDoctor);
routes.get('/doctor', controllers.EmployeeController.getDoctors);
routes.get('/doctor/:cpf', controllers.EmployeeController.getDoctor);
routes.put('/doctor/:cpf', controllers.EmployeeController.editDoctor);
routes.post('/nurse', controllers.EmployeeController.insertNurse);
routes.get('/nurse', controllers.EmployeeController.getNurses);
routes.get('/nurse/:cpf', controllers.EmployeeController.getNurse);
routes.put('/nurse/:cpf', controllers.EmployeeController.editNurse);

routes.get(
  '/patients-triagem',
  controllers.ProntuarioController.getPatientsTriagem
);

routes.post('/prontuario', controllers.ProntuarioController.insertProntuario);
routes.get('/prontuario/:personid', controllers.ProntuarioController.getProntuario);

routes.get(
  '/patients-atendimento',
  controllers.AtendimentoController.getPatientsAtendimento
);

routes.post('/atendimento', controllers.AtendimentoController.insertAtendimento);
routes.get('/atendimento/:personid', controllers.AtendimentoController.getAtendimento);
routes.put('/atendimento/:treatmentid', controllers.AtendimentoController.endAtendimento);
routes.post('/gerar-atendimento', controllers.AtendimentoController.createAtendimento);

routes.get(
  '/patients-procedimento',
  controllers.ProcedimentoController.getPatientsProcedimento
);

routes.post('/procedimento', controllers.ProcedimentoController.insertProcedimento);
routes.get('/procedimento/:personid', controllers.ProcedimentoController.getProcedimento);
routes.put('/procedimento/:procedureid', controllers.ProcedimentoController.editProcedimento);


module.exports = routes;
