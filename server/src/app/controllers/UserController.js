const { pool } = require('../../config/database');

class UserController {
  async getUsers(request, response) {
    try {
      const res = await pool.query('SELECT * FROM users ORDER BY id ASC');
      response.status(200).json(res.rows);
    } catch (err) {
      throw err;
    }
  }

  async createUser(request, response) {
    const { name, email } = request.body;
    try {
      const res = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      response.status(201).send(`User added with ID: ${res.rows[0].id}`);
    } catch (err) {
      // throw err;
      response.status(400).send('ai n filhote');
    }
  }
}

module.exports = new UserController();
