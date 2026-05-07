const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/status', (req, res) => {
  res.json({ message: 'API del TFG activa y conectada a PostgreSQL', status: 'Senior Dev Architecture' });
});

// Servir el frontend en cualquier otra ruta no definida
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
