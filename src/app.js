const express = require('express');
const app = express();

app.use(express.json());

// Importar rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API del TFG activa y conectada a PostgreSQL', status: 'Senior Dev Architecture' });
});

module.exports = app;
