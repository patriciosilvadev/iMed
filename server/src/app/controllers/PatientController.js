const { pool } = require('../../config/database');

class PatientController {
  async insertPatient(request, response) {
    const { personname, cpf, sex, healthplan, birth } = request.body;
    const transaction = `
    BEGIN;
    INSERT INTO Person (personid, cpf, personname, birth, sex, status) VALUES (DEFAULT, ${cpf}, '${personname}', '${birth}', '${sex}', 'Ativo');
    INSERT INTO Patient (healthplan, patientid) VALUES ('${healthplan}', (SELECT personid FROM Person WHERE cpf='${cpf}'));
    COMMIT;
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
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
    const { personname, cpf, sex, healthplan, birth, patientid } = request.body;
    const transaction = `
    UPDATE Patient SET healthplan = '${healthplan}' WHERE patientid = ${patientid};
    UPDATE Person SET personname = '${personname}', cpf = ${cpf}, birth = '${birth}', sex = '${sex}' WHERE personid = ${patientid};
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getPatients(request, response) {
    const query =
      'SELECT per.personid, per.cpf, per.personname, per.birth, per.sex, per.status, pat.healthplan FROM Person per, Patient pat WHERE per.personid = pat.patientid ORDER BY per.personid DESC';
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }
}

module.exports = new PatientController();
