const { pool } = require('../../config/database');

class ProntuarioController {
  async getPatientsTriagem(request, response) {
    const query = `SELECT per.personid, per.personname, per.status FROM Person per, Patient pat WHERE per.personid = pat.patientid AND per.status = 'Aguardando triagem' ORDER BY per.personid ASC`;
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async insertProntuario(request, response) {
    const { patientid, nurseid, temperatura, pressao, sintomas } = request.body;
    const transaction = `
    INSERT INTO Prontuario (prontuarioid, patientid, nurseid, temperatura, pressao, sintomas) VALUES (DEFAULT, ${patientid}, ${nurseid}, ${temperatura}, ${pressao}, '${sintomas}');
    UPDATE Person SET status = 'Aguardando atendimento' WHERE personid = ${patientid};
    `;
    try {
      const res = await pool.query(transaction);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getProntuario(request, response) {
    const { personid } = request.params
    const query = `SELECT * FROM Prontuario p WHERE p.patientid = ${personid} ORDER BY prontuarioid DESC LIMIT 1`;
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }
}

module.exports = new ProntuarioController();
