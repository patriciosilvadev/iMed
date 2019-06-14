const express = require('express');
const controllers = require('./app/controllers');
const routes = express.Router();
// const path = require('path');

routes.get('/create-tables', controllers.TablesController.inserEncaminhamento);

routes.post('/patient', controllers.PatientController.insertPatient);
routes.get('/patient', controllers.PatientController.getPatients);
routes.get('/patient/:cpf', controllers.PatientController.getPatient);
routes.put('/patient/:cpf', controllers.PatientController.editPatient);

module.exports = routes;
