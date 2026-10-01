// src/controllers/role.controller.js

const roleModel = require('../models/role.model');

// GET /api/roles
async function list(req, res, next) {
  try {
    const roles = await roleModel.findAll();

    res.json(roles);
  } catch (err) {
    next(err);
  }
}

// POST /api/roles
async function create(req, res, next) {
  try {
    let { code, name, description } = req.body;

    // Limpiar espacios
    code = String(code || '').trim().toUpperCase();
    name = String(name || '').trim();
    description = String(description || '').trim();

    // Validaciones
    if (!code) {
      return res.status(400).json({
        message: 'El código del rol es obligatorio.'
      });
    }

    if (!name) {
      return res.status(400).json({
        message: 'El nombre del rol es obligatorio.'
      });
    }

    if (code.length > 30) {
      return res.status(400).json({
        message: 'El código no puede superar los 30 caracteres.'
      });
    }

    if (name.length > 50) {
      return res.status(400).json({
        message: 'El nombre no puede superar los 50 caracteres.'
      });
    }

    // Crear rol
    const id = await roleModel.create({
      code,
      name,
      description
    });

    res.status(201).json({
      id,
      message: `Rol "${name}" creado correctamente.`
    });

  } catch (err) {

    // Código de rol repetido
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: 'Ya existe un rol con ese código.'
      });
    }

    next(err);
  }
}

module.exports = {
  list,
  create
};