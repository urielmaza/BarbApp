// Modelo de acceso a datos para tabla 'servicios'.
// Estructura real (según usuario): id, nombre, duracion, precio

const pool = require('../config/db');

async function obtenerServicios() {
  const [rows] = await pool.query('SELECT id, nombre, duracion, precio FROM servicios ORDER BY nombre');
  return rows;
}

module.exports = { obtenerServicios };