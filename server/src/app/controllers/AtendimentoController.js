const { pool } = require('../../config/database');

class AtendimentoController {
  async getPatientsAtendimento(request, response) {
    const query = `SELECT DISTINCT per.personid, per.personname, per.status FROM Person per, Patient pat WHERE per.personid = pat.patientid AND per.status = 'Aguardando atendimento' OR per.status = 'Procedimento realizado' ORDER BY per.personid ASC`;
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async insertAtendimento(request, response) {
    const { doctorid, nurseid, patientid, prontuarioid, datainicio, datafim } = request.body;
    const transaction = `
    INSERT INTO Treatment (treatmentid, doctorid, nurseid, receptionistid, patientid, prontuarioid, datainicio, datafim) VALUES (DEFAULT, ${doctorid}, ${nurseid}, 3, ${patientid}, ${prontuarioid}, '${datainicio}', '${datafim}');
    UPDATE Person SET status = 'Atendimento finalizado' WHERE personid = ${patientid};
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

module.exports = new AtendimentoController();