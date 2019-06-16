const { pool } = require('../../config/database');

class ProcedimentoController {
  async getPatientsProcedimento(request, response) {
    const query = `SELECT per.personid, per.personname, per.status FROM Person per, Patient pat WHERE per.personid = pat.patientid AND per.status = 'Aguardando procedimento' ORDER BY per.personid ASC`;
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async insertProcedimento(request, response) {
    const { patientid, procedurename } = request.body;
    const transaction = `
    INSERT INTO Procedure (procedureid, procedurename, patientid, nurseid, path) VALUES (DEFAULT, '${procedurename}', ${patientid}, NULL, NULL);
    UPDATE Person SET status = 'Aguardando procedimento' WHERE personid = ${patientid};
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getProcedimento(request, response) {
    const { personid } = request.params
    const query = `SELECT * FROM Procedure p WHERE p.patientid = ${personid} ORDER BY procedureid DESC LIMIT 1`;
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async editProcedimento(request, response) {
    const { procedureid, patientid, nurseid, path, treatmentid  } = request.body
    const transaction = `
    UPDATE Procedure SET nurseid = ${nurseid}, path = '${path}' WHERE procedureid = ${procedureid};
    INSERT INTO Encaminhamento (encaminhamentoid, treatmentid, procedureid) VALUES (DEFAULT, ${treatmentid}, (SELECT procedureid FROM Procedure p WHERE p.patientid = ${patientid} ORDER BY procedureid DESC LIMIT 1));
    UPDATE Person SET status = 'Procedimento realizado' WHERE personid = ${patientid};
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

module.exports = new ProcedimentoController();
