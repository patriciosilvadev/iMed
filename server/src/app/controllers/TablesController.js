const { pool } = require('../../config/database');

class TablesController {
  async createPerson(request, response) {
    const person = `CREATE TABLE IF NOT EXISTS
      Person (
        personid SERIAL PRIMARY KEY UNIQUE,
        cpf varchar(11) NOT NULL UNIQUE,
        personName varchar(50) NOT NULL,
        birth date,
        sex varchar(1),
        status varchar(50)
      )`;
    try {
      const res = await pool.query(person);
      response.status(200).json(res);
    } catch (err) {
      response.status(500).json(err);
    }
  }

  async createPatient(request, response) {
    const patient = `CREATE TABLE IF NOT EXISTS
      Patient (
        healthPlan varchar(20),
	      patientid int UNIQUE REFERENCES Person(personid)
      )`;
    try {
      const res = await pool.query(patient);
      console.log(res);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async createEmployee(request, response) {
    const employee = `CREATE TABLE IF NOT EXISTS
      Employee (
        setor varchar(20),
        salario real,
	      employeeid int UNIQUE REFERENCES Person(personid)
      )`;
    try {
      const res = await pool.query(employee);
      response.status(200).json(res);
    } catch (err) {
      response.status(500).json(err);
    }
  }

  async createDoctor(request, response) {
    const doctor = `CREATE TABLE IF NOT EXISTS
      Doctor (
        crm varchar(10) UNIQUE,
        especialidade varchar(100),
	      doctorid int UNIQUE REFERENCES Employee(employeeid)
      )`;
    try {
      const res = await pool.query(doctor);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async createNurse(request, response) {
    const nurse = `CREATE TABLE IF NOT EXISTS
      Nurse (
        cofen varchar(10) UNIQUE,
	      nurseid int UNIQUE REFERENCES Employee(employeeid)
      )`;
    try {
      const res = await pool.query(nurse);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async createReceptionist(request, response) {
    const receptionist = `CREATE TABLE IF NOT EXISTS
      Receptionist (
        login varchar(20),
	      receptionistid int UNIQUE REFERENCES Employee(employeeid)
      )`;
    try {
      const res = await pool.query(receptionist);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async createProntuario(request, response) {
    const prontuario = `CREATE TABLE IF NOT EXISTS
      Prontuario (
        prontuarioid SERIAL PRIMARY KEY UNIQUE,
        patientid int REFERENCES Patient(patientid),
        nurseid int REFERENCES Nurse(nurseid),
        temperatura real,
        pressao real,
        sintomas varchar(200)
      )`;
    try {
      const res = await pool.query(prontuario);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async createTreatment(request, response) {
    const treatment = `CREATE TABLE IF NOT EXISTS
      Treatment (
        treatmentid SERIAL PRIMARY KEY UNIQUE,
        doctorid int REFERENCES Doctor(doctorid),
        nurseid int REFERENCES Nurse(nurseid),
        receptionistid int REFERENCES Receptionist(receptionistid),
        patientid int REFERENCES Patient(patientid),
        prontuarioid int REFERENCES Prontuario(prontuarioid),
        datainicio date,
        datafim date
      )`;
    try {
      const res = await pool.query(treatment);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async createProcedure(request, response) {
    const procedure = `CREATE TABLE IF NOT EXISTS
      Procedure (
        procedureid SERIAL PRIMARY KEY UNIQUE,
        procedurename varchar(50),
        patientid int REFERENCES Patient(patientid),
        nurseid int REFERENCES Nurse(nurseid),
        path varchar(50)
      )`;
    try {
      const res = await pool.query(procedure);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async createEncaminhamento(request, response) {
    const encaminhamento = `CREATE TABLE IF NOT EXISTS
      Encaminhamento (
        encaminhamentoid SERIAL PRIMARY KEY UNIQUE,
        treatmentid int REFERENCES Treatment(treatmentid),
        procedureid int REFERENCES Procedure(procedureid)
      )`;
    try {
      const res = await pool.query(encaminhamento);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }
}

module.exports = new TablesController();
