const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>¡Hola desde Railway!</h1><p>Esta es una aplicación de prueba desplegada con éxito.</p>');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
