const { pool } = require('../../config/database');

class HistoricoController {
  async getPatientAtendimentos(request, response) {
    const query = `
    SELECT
    t.datainicio AS data_inicio,
    t.datafim AS data_fim,
    patient.personname AS nome_paciente,
    doctor.personname AS nome_medico,
    nurse.personname AS nome_enfermeira,
    pront.temperatura AS temperatura,
    pront.pressao AS pressao,
    pront.sintomas AS sintomas,
    proc.procedurename AS procedimento_nome,
    proc.path AS local_do_resultado,
    res.personname AS enfermeira_responsavel
    FROM Treatment t
    JOIN Person patient ON patient.personid = t.patientid
    JOIN Person doctor ON doctor.personid = t.doctorid
    JOIN Person nurse ON nurse.personid = t.nurseid
    JOIN Prontuario pront ON pront.prontuarioid = t.prontuarioid
    LEFT JOIN Encaminhamento enc ON enc.treatmentid = t.treatmentid
    LEFT JOIN Procedure proc ON proc.procedureid = enc.procedureid
    LEFT JOIN Person res ON res.personid = proc.nurseid
    WHERE t.patientid = ${request.params.patientid}
    ORDER BY t.treatmentid ASC, proc.procedureid ASC;
    `;
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getDoctorAtendimentos(request, response) {
    const query = `
    SELECT
    t.datainicio AS data_inicio,
    t.datafim AS data_fim,
    patient.personname AS nome_paciente,
    doctor.personname AS nome_medico,
    nurse.personname AS nome_enfermeira,
    pront.temperatura AS temperatura,
    pront.pressao AS pressao,
    pront.sintomas AS sintomas,
    proc.procedurename AS procedimento_nome,
    proc.path AS local_do_resultado,
    res.personname AS enfermeira_responsavel
    FROM Treatment t
    JOIN Person patient ON patient.personid = t.patientid
    JOIN Person doctor ON doctor.personid = t.doctorid
    JOIN Person nurse ON nurse.personid = t.nurseid
    JOIN Prontuario pront ON pront.prontuarioid = t.prontuarioid
    LEFT JOIN Encaminhamento enc ON enc.treatmentid = t.treatmentid
    LEFT JOIN Procedure proc ON proc.procedureid = enc.procedureid
    LEFT JOIN Person res ON res.personid = proc.nurseid
    WHERE t.doctorid = ${request.params.doctorid}
    ORDER BY t.treatmentid ASC, proc.procedureid ASC;
    `;
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }

  async getNurseAtendimentos(request, response) {
    const query = `
    SELECT
    t.datainicio AS data_inicio,
    t.datafim AS data_fim,
    patient.personname AS nome_paciente,
    doctor.personname AS nome_medico,
    nurse.personname AS nome_enfermeira,
    pront.temperatura AS temperatura,
    pront.pressao AS pressao,
    pront.sintomas AS sintomas,
    proc.procedurename AS procedimento_nome,
    proc.path AS local_do_resultado,
    res.personname AS enfermeira_responsavel
    FROM Treatment t
    JOIN Person patient ON patient.personid = t.patientid
    JOIN Person doctor ON doctor.personid = t.doctorid
    JOIN Person nurse ON nurse.personid = t.nurseid
    JOIN Prontuario pront ON pront.prontuarioid = t.prontuarioid
    LEFT JOIN Encaminhamento enc ON enc.treatmentid = t.treatmentid
    LEFT JOIN Procedure proc ON proc.procedureid = enc.procedureid
    LEFT JOIN Person res ON res.personid = proc.nurseid
    WHERE t.nurseid = ${request.params.nurseid}
    ORDER BY t.treatmentid ASC, proc.procedureid ASC;
    `;
    try {
      const res = await pool.query(query);
      response.status(200).json(res);
    } catch (err) {
      console.log(err);
      response.status(500).json(err);
    }
  }
}

module.exports = new HistoricoController();
