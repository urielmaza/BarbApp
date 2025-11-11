// Modelo de acceso a datos para tabla 'reservas'.
// Estructura real (según usuario): id, nombre, telefono, servicio, fecha, hora, creado_en
// Asumimos 'servicio' almacena el id de la tabla servicios (FK implícita).

const pool = require('../config/db');

async function obtenerReservas() {
  const [rows] = await pool.query(`SELECT r.id, r.nombre, r.telefono, r.servicio, r.fecha, r.hora, r.creado_en, s.nombre AS servicio_nombre
                                   FROM reservas r INNER JOIN servicios s ON r.servicio = s.id
                                   ORDER BY r.fecha DESC, r.hora ASC`);
  return rows;
}

async function obtenerHorariosDisponibles(servicioId, fecha) {
  // Horarios base: ejemplo cada hora de 09:00 a 18:00 (puede ajustarse). Mantener minimalista.
  const horariosBase = [
    '09:00:00','10:00:00','11:00:00','12:00:00','13:00:00','14:00:00','15:00:00','16:00:00','17:00:00'
  ];
  const [ocupadasRows] = await pool.query('SELECT hora FROM reservas WHERE fecha = ? AND servicio = ?', [fecha, servicioId]);
  const ocupadas = new Set(ocupadasRows.map(r => r.hora));
  return horariosBase.filter(h => !ocupadas.has(h));
}

async function crearReserva({ servicio, fecha, hora, nombre, telefono }) {
  // Validar conflicto
  const [conflict] = await pool.query('SELECT id FROM reservas WHERE fecha = ? AND hora = ? AND servicio = ?', [fecha, hora, servicio]);
  if (conflict.length > 0) {
    const error = new Error('Horario no disponible');
    error.code = 'CONFLICT';
    throw error;
  }
  const [result] = await pool.query('INSERT INTO reservas (nombre, telefono, servicio, fecha, hora) VALUES (?,?,?,?,?)', [nombre, telefono, servicio, fecha, hora]);
  return { id: result.insertId, nombre, telefono, servicio, fecha, hora };
}

module.exports = { obtenerReservas, obtenerHorariosDisponibles, crearReserva };