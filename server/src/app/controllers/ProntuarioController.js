const { pool } = require('../../config/database');

class ProntuarioController {
  async getPatientsTriagem(request, response) {
    const query = `SELECT per.personid, per.personname, per.status, pat.healthplan FROM Person per, Patient pat WHERE per.personid = pat.patientid AND per.status = 'Aguardando triagem' ORDER BY per.personid ASC`;
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
