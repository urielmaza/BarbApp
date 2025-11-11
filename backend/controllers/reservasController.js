// Controlador para reservas y horarios
const { obtenerReservas, obtenerHorariosDisponibles, crearReserva } = require('../models/reservasModel');
const { obtenerServicios } = require('../models/serviciosModel');

async function getHorarios(req, res) {
  try {
    const { servicioId, fecha } = req.query;
    if (!servicioId || !fecha) {
      return res.status(400).json({ error: 'Faltan parámetros: servicioId y fecha (YYYY-MM-DD)' });
    }
    const horarios = await obtenerHorariosDisponibles(Number(servicioId), fecha);
    return res.json({ fecha, servicioId: Number(servicioId), horarios });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al obtener horarios' });
  }
}

async function getReservas(req, res) {
  try {
    const reservas = await obtenerReservas();
    return res.json(reservas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al obtener reservas' });
  }
}

async function postReserva(req, res) {
  try {
    const { nombre, telefono, servicio, fecha, hora } = req.body;
    if (!nombre || !telefono || !servicio || !fecha || !hora) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }
    const nueva = await crearReserva({ nombre, telefono, servicio: Number(servicio), fecha, hora });
    return res.status(201).json({ message: 'Reserva confirmada', reserva: nueva });
  } catch (err) {
    if (err.code === 'CONFLICT') {
      return res.status(409).json({ error: 'Horario no disponible' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Error al crear la reserva' });
  }
}

async function getServicios(req, res) {
  try {
    const servicios = await obtenerServicios();
    return res.json(servicios);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al obtener servicios' });
  }
}

module.exports = { getHorarios, getReservas, postReserva, getServicios };