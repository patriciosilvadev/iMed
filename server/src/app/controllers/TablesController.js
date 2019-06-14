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
        setor varchar(10),
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

  async insertPatient(request, response) {
    const transaction = `
    BEGIN;
    INSERT INTO Person (personid, cpf, personname, birth, sex, status) VALUES (DEFAULT, 2424, 'emanuel', '03/10/1993', 'M');
    INSERT INTO Patient (healthplan, patientid) VALUES ('Unimed', (SELECT personid FROM Person WHERE cpf='2424'));
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

  async insertNurse(request, response) {
    const transaction = `
    BEGIN;
    INSERT INTO Person (personid, cpf, personname, birth, sex) VALUES (DEFAULT, 789, 'joao', '03/10/1993', 'M');
    INSERT INTO Employee (setor, salario, employeeid) VALUES ('IMD', '2500', (SELECT personid FROM Person WHERE cpf='789'));
    INSERT INTO Nurse (cofen, nurseid) VALUES ('999', (SELECT employeeid FROM Employee, Person p WHERE p.cpf='789' and employeeid = p.personid));
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

  async insertReceptionist(request, response) {
    const transaction = `
    BEGIN;
    INSERT INTO Person (personid, cpf, personname, birth, sex) VALUES (DEFAULT, 999, 'joao', '03/10/1993', 'M');
    INSERT INTO Employee (setor, salario, employeeid) VALUES ('IMD', '2500', (SELECT personid FROM Person WHERE cpf='999'));
    INSERT INTO Receptionist (setor, receptionistid) VALUES ('DIMAP', (SELECT employeeid FROM Employee, Person p WHERE p.cpf='999' and employeeid = p.personid));
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

  async insertProntuario(request, response) {
    const transaction = `
    INSERT INTO Prontuario (prontuarioid, patientid, nurseid, temperatura, pressao, sintomas) VALUES (DEFAULT, (SELECT personid FROM Person WHERE cpf='123'), (SELECT personid FROM Person WHERE cpf='789'), 39, 17.9, 'Febre');
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

  async insertAtendimento(request, response) {
    const transaction = `
    INSERT INTO Treatment (treatmentid, doctorid, nurseid, receptionistid, patientid, prontuarioid, datainicio, datafim) VALUES 
      (
        DEFAULT, 
        (SELECT personid FROM Person WHERE cpf='456'),
        (SELECT personid FROM Person WHERE cpf='789'),
        (SELECT personid FROM Person WHERE cpf='999'),
        (SELECT personid FROM Person WHERE cpf='123'),
        (SELECT prontuarioid FROM Prontuario pront, Person p WHERE p.cpf='123' and p.personid = pront.patientid ORDER BY prontuarioid DESC LIMIT 1),
        '11/06/2019',
        '11/06/2019'
      );
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

  async insertProcedure(request, response) {
    const transaction = `
    INSERT INTO Procedure (procedureid, procedurename, patientid, nurseid, path) VALUES (DEFAULT, 'Exame de sangue', (SELECT personid FROM Person WHERE cpf='123'), (SELECT personid FROM Person WHERE cpf='789'), 'C:/Arquivos/Procedimentos')
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

  async inserEncaminhamento(request, response) {
    const transaction = `
    INSERT INTO Encaminhamento (encaminhamentoid, treatmentid, procedureid) VALUES (DEFAULT, 
      (SELECT treatmentid FROM Treatment t, Person p WHERE p.cpf = '123' and p.personid = t.patientid ORDER BY treatmentid DESC LIMIT 1),
      (SELECT procedureid FROM Procedure t, Person p WHERE p.cpf = '123' and p.personid = t.patientid ORDER BY procedureid DESC LIMIT 1)
    )
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
