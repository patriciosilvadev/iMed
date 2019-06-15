const { pool } = require('../../config/database');

class EmployeeController {
  async insertReceptionist(request, response) {
    const { personname, cpf, sex, birth, setor, salario, login } = request.body;
    const transaction = `
    BEGIN;
    INSERT INTO Person (personid, cpf, personname, birth, sex, status) VALUES (DEFAULT, ${cpf}, '${personname}', '${birth}', '${sex}', 'Ativo');
    INSERT INTO Employee (setor, salario, employeeid) VALUES ('${setor}', ${salario}, (SELECT personid FROM Person WHERE cpf='${cpf}'));
    INSERT INTO Receptionist (login, receptionistid) VALUES ('${login}', (SELECT personid FROM Person WHERE cpf='${cpf}'));
    COMMIT;
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async inserDoctor(request, response) {
    const {
      personname,
      cpf,
      sex,
      birth,
      setor,
      salario,
      crm,
      especialidade
    } = request.body;
    const transaction = `
    BEGIN;
    INSERT INTO Person (personid, cpf, personname, birth, sex, status) VALUES (DEFAULT, ${cpf}, '${personname}', '${birth}', '${sex}', 'Ativo');
    INSERT INTO Employee (setor, salario, employeeid) VALUES ('${setor}', ${salario}, (SELECT personid FROM Person WHERE cpf='${cpf}'));
    INSERT INTO Doctor (crm, especialidade, doctorid) VALUES ('${crm}', '${especialidade}', (SELECT personid FROM Person WHERE cpf='${cpf}'));
    COMMIT;
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async insertNurse(request, response) {
    const { personname, cpf, sex, birth, setor, salario, cofen } = request.body;
    const transaction = `
    BEGIN;
    INSERT INTO Person (personid, cpf, personname, birth, sex, status) VALUES (DEFAULT, ${cpf}, '${personname}', '${birth}', '${sex}', 'Ativo');
    INSERT INTO Employee (setor, salario, employeeid) VALUES ('${setor}', ${salario}, (SELECT personid FROM Person WHERE cpf='${cpf}'));
    INSERT INTO Nurse (cofen, nurseid) VALUES ('${cofen}', (SELECT personid FROM Person WHERE cpf='${cpf}'));
    COMMIT;
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getPatient(request, response) {
    const { cpf } = request.params;
    try {
      const res = await pool.query(
        'SELECT * FROM Person per, Patient pat WHERE per.cpf = $1 and per.personid = pat.patientid',
        [cpf]
      );
      if (res !== undefined) response.status(200).json(res.rows[0]);
      else response.status(200).json([]);
    } catch (err) {
      response.status(500).json(err);
    }
  }

  async editPatient(request, response) {
    const {
      personname,
      cpf,
      sex,
      healthplan,
      birth,
      patientid,
      status
    } = request.body;
    const transaction = `
    UPDATE Patient SET healthplan = '${healthplan}' WHERE patientid = ${patientid};
    UPDATE Person SET personname = '${personname}', cpf = ${cpf}, birth = '${birth}', sex = '${sex}', status = '${status}' WHERE personid = ${patientid};
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getReceptionists(request, response) {
    const query =
      'SELECT per.personid, per.cpf, per.personname, per.birth, per.sex, per.status, emp.setor, emp.salario, rec.login FROM Person per, Employee emp, Receptionist rec WHERE per.personid = emp.employeeid and emp.employeeid = rec.receptionistid ORDER BY per.personid DESC';
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getDoctors(request, response) {
    const query =
      'SELECT per.personid, per.cpf, per.personname, per.birth, per.sex, per.status, emp.setor, emp.salario, doc.crm, doc.especialidade FROM Person per, Employee emp, Doctor doc WHERE per.personid = emp.employeeid and emp.employeeid = doc.doctorid ORDER BY per.personid DESC';
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getNurses(request, response) {
    const query =
      'SELECT per.personid, per.cpf, per.personname, per.birth, per.sex, per.status, emp.setor, emp.salario, nur.cofen FROM Person per, Employee emp, Nurse nur WHERE per.personid = emp.employeeid and emp.employeeid = nur.nurseid ORDER BY per.personid DESC';
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getReceptionist(request, response) {
    const cpf = request.params.cpf;
    const query = `SELECT * FROM Person per, Employee emp, Receptionist rec WHERE per.cpf = '${cpf}' and per.personid = emp.employeeid and emp.employeeid = rec.receptionistid ORDER BY per.personid DESC`;
    try {
      const res = await pool.query(query);
      response.status(200).json(res.rows[0]);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async editReceptionist(request, response) {
    const {
      personname,
      cpf,
      sex,
      setor,
      birth,
      personid,
      status,
      login,
      salario
    } = request.body;
    const transaction = `
    UPDATE Receptionist SET login = '${login}' WHERE receptionistid = ${personid};
    UPDATE Employee SET setor = '${setor}', salario = ${salario} WHERE employeeid = ${personid};
    UPDATE Person SET personname = '${personname}', cpf = ${cpf}, birth = '${birth}', sex = '${sex}', status = '${status}' WHERE personid = ${personid};
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getDoctor(request, response) {
    const cpf = request.params.cpf;
    const query = `SELECT * FROM Person per, Employee emp, Doctor doc WHERE per.cpf = '${cpf}' and per.personid = emp.employeeid and emp.employeeid = doc.doctorid ORDER BY per.personid DESC`;
    try {
      const res = await pool.query(query);
      response.status(200).json(res.rows[0]);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async editDoctor(request, response) {
    const {
      personname,
      cpf,
      sex,
      setor,
      birth,
      personid,
      status,
      crm,
      especialidade,
      salario
    } = request.body;
    const transaction = `
    UPDATE Doctor SET crm = '${crm}', especialidade = '${especialidade}' WHERE doctorid = ${personid};
    UPDATE Employee SET setor = '${setor}', salario = ${salario} WHERE employeeid = ${personid};
    UPDATE Person SET personname = '${personname}', cpf = ${cpf}, birth = '${birth}', sex = '${sex}', status = '${status}' WHERE personid = ${personid};
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getNurse(request, response) {
    const cpf = request.params.cpf;
    const query = `SELECT * FROM Person per, Employee emp, Nurse nur WHERE per.cpf = '${cpf}' and per.personid = emp.employeeid and emp.employeeid = nur.nurseid ORDER BY per.personid DESC`;
    try {
      const res = await pool.query(query);
      response.status(200).json(res.rows[0]);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async editNurse(request, response) {
    const {
      personname,
      cpf,
      sex,
      setor,
      birth,
      personid,
      status,
      cofen,
      salario
    } = request.body;
    const transaction = `
    UPDATE Nurse SET cofen = '${cofen}' WHERE nurseid = ${personid};
    UPDATE Employee SET setor = '${setor}', salario = ${salario} WHERE employeeid = ${personid};
    UPDATE Person SET personname = '${personname}', cpf = ${cpf}, birth = '${birth}', sex = '${sex}', status = '${status}' WHERE personid = ${personid};
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }
}

module.exports = new EmployeeController();
