// src/models/role.model.js
// Consultas para administrar los roles disponibles en el registro.
const { pool } = require('../config/database');

async function findAll() {
  const [rows] = await pool.query(`
    SELECT role_id AS id,
           role_code AS code,
           role_name AS name,
           role_description AS description
      FROM roles
     WHERE role_is_active = 1
     ORDER BY role_name`);
  return rows;
}

async function create({ code, name, description }) {
  const [result] = await pool.execute(
    `INSERT INTO roles (role_code, role_name, role_description)
     VALUES (?, ?, ?)`,
    [code, name, description || null]
  );
  return result.insertId;
}

module.exports = { findAll, create };
