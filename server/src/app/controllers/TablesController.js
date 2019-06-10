const { pool } = require('../../config/database');

class TablesController {
  async createPerson(request, response) {
    const person = `CREATE TABLE IF NOT EXISTS
      Person (
        personid SERIAL PRIMARY KEY UNIQUE,
        cpf varchar(11) NOT NULL UNIQUE,
        personName varchar(50) NOT NULL,
        birth date,
        sex varchar(1)
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
	      patientid int REFERENCES Person(personid)
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
	      doctorid int REFERENCES Employee(employeeid)
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
	      nurseid int REFERENCES Employee(employeeid)
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
        setor varchar(10),
	      receptionistid int REFERENCES Employee(employeeid)
      )`;
    try {
      const res = await pool.query(receptionist);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async insertPatient(request, response) {
    const transaction = `
    BEGIN;
    INSERT INTO Person (personid, cpf, personname, birth, sex) VALUES (DEFAULT, 123, 'joao', '03/10/1993', 'M');
    INSERT INTO Patient (healthplan, patientid) VALUES ('Unimed', (SELECT personid FROM Person WHERE cpf='123'));
    COMMIT;
    `;
    try {
      const res = await pool.query(transaction);
      console.log(res);
      response.status(200).json(res[1].rows);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async insertDoctor(request, response) {
    const transaction = `
    BEGIN;
    INSERT INTO Person (personid, cpf, personname, birth, sex) VALUES (DEFAULT, 456, 'joao', '03/10/1993', 'M');
    INSERT INTO Employee (setor, salario, employeeid) VALUES ('IMD', '2500', (SELECT personid FROM Person WHERE cpf='456'));
    INSERT INTO Doctor (crm, especialidade, doctorid) VALUES ('999', 'Pediatra', (SELECT employeeid FROM Employee, Person p WHERE p.cpf='456' and employeeid = p.personid));
    COMMIT;
    `;
    try {
      const res = await pool.query(transaction);
      console.log(res);
      response.status(200).json(res[1].rows);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }
}

module.exports = new TablesController();
