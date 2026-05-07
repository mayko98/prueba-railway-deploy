const app = require('./app');
const port = process.env.PORT || 3000;
const { pool } = require('./config/db');

const startServer = async () => {
  try {
    // Test de conexión antes de arrancar
    await pool.query('SELECT NOW()');
    app.listen(port, () => {
      console.log(`Servidor profesional corriendo en el puerto ${port}`);
    });
  } catch (err) {
    console.error('Error al conectar a la DB:', err);
    process.exit(1);
  }
};

startServer();
