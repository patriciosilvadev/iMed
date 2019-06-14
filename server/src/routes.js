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
routes.post('/doctor', controllers.EmployeeController.inserDoctor);
routes.get('/doctor', controllers.EmployeeController.getDoctors);
routes.post('/nurse', controllers.EmployeeController.insertNurse);
routes.get('/nurse', controllers.EmployeeController.getNurses);

module.exports = routes;
