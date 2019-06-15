const express = require('express');
const controllers = require('./app/controllers');
const routes = express.Router();
// const path = require('path');

routes.get('/create-tables', controllers.TablesController.inserEncaminhamento);

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

module.exports = routes;
