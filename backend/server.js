// Servidor Express principal para BarbApp.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const reservasRoutes = require('./routes/reservasRoutes');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Prefijo API según documentación
app.use('/api', reservasRoutes);

// Health check simple (no altera endpoints documentados)
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
	console.log(`BarbApp backend escuchando en puerto ${PORT}`);
	// Probar conexión a la base de datos y mostrar mensaje claro en consola
	try {
		const [rows] = await pool.query('SELECT 1 AS ok');
		if (rows && rows.length > 0) {
			console.log('✅ Conexión a MySQL exitosa');
		} else {
			console.warn('⚠️ Respuesta inesperada al verificar la base de datos');
		}
	} catch (err) {
		console.error('❌ Error al conectar con MySQL:', err.message);
	}
});
