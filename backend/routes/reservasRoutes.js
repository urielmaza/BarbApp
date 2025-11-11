const express = require('express');
const router = express.Router();
const { getHorarios, getReservas, postReserva, getServicios } = require('../controllers/reservasController');

// Endpoints según documentación
router.get('/horarios', getHorarios);           // GET /api/horarios
router.get('/reservas', getReservas);           // GET /api/reservas
router.post('/reservas', postReserva);          // POST /api/reservas

// Endpoint auxiliar para frontend: listar servicios (necesario para seleccionar servicio)
router.get('/servicios', getServicios);         // GET /api/servicios

module.exports = router;