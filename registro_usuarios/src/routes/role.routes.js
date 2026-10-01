// src/routes/role.routes.js

const { Router } = require('express');

const roleController = require('../controllers/role.controller');

const router = Router();

// GET /api/roles
router.get('/', roleController.list);

// POST /api/roles
router.post('/', roleController.create);

module.exports = router;