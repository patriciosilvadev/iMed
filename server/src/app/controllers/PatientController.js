const { pool } = require('../../config/database');

class PatientController {
  async getPatients(request, response) {
    try {
      const res = await pool.query('SELECT * FROM patient ORDER BY id ASC');
      response.status(200).json(res.rows);
    } catch (err) {
      response.status(500).json(err);
    }
  }

  async getPatient(request, response) {
    const { cpf } = request.params;
    try {
      const res = await pool.query('SELECT * FROM patient WHERE cpf = $1', [
        cpf
      ]);
      if (res !== undefined) response.status(200).json(res.rows[0]);
      else response.status(200).json([]);
    } catch (err) {
      response.status(500).json(err);
    }
  }

  async editPatient(request, response) {
    const {
      nome,
      nome_mae,
      nome_pai,
      nascimento,
      rg_numero,
      rg_orgao,
      rg_data,
      idade,
      sexo,
      cpf
    } = request.body;
    const cpf_request = request.params.cpf;
    try {
      const res = await pool.query(
        'UPDATE patient SET nome = ($1), nome_mae = ($2), nome_pai = ($3), nascimento = ($4), rg_numero = ($5), rg_orgao = ($6), rg_data = ($7), idade = ($8), sexo = ($9), cpf = ($10) WHERE cpf = ($11) RETURNING *',
        [
          nome,
          nome_mae,
          nome_pai,
          nascimento,
          rg_numero,
          rg_orgao,
          rg_data,
          idade,
          sexo,
          cpf,
          cpf_request
        ]
      );
      response.status(200).json(res.rows);
    } catch (err) {
      response.status(500).json(err);
    }
  }

  async createPatient(request, response) {
    const {
      nome,
      nome_mae,
      nome_pai,
      nascimento,
      rg_numero,
      rg_orgao,
      rg_data,
      idade,
      sexo,
      cpf
    } = request.body;
    try {
      const res = await pool.query(
        'INSERT INTO patient (nome, nome_mae, nome_pai, nascimento, rg_numero, rg_orgao, rg_data, idade, sexo, cpf) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [
          nome,
          nome_mae,
          nome_pai,
          nascimento,
          rg_numero,
          rg_orgao,
          rg_data,
          idade,
          sexo,
          cpf
        ]
      );
      response.status(200).json(res.rows);
    } catch (err) {
      response.status(500).json(err);
    }
  }
}

module.exports = new PatientController();
