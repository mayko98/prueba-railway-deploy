const { pool } = require('./db');

const createTables = async () => {
  const client = await pool.connect();
  try {
    console.log('Iniciando creación de tablas...');
    
    // Tabla de Usuarios
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla "users" lista.');

    // Tabla de Tareas (Relacional)
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla "tasks" lista.');

    // Insertar datos de ejemplo si está vacía
    const userRes = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(userRes.rows[0].count) === 0) {
      console.log('Insertando datos de ejemplo...');
      await client.query(`
        INSERT INTO users (name, email) VALUES 
        ('Mayko Torres', 'mayko@example.com'),
        ('Tribunal TFG', 'profe@universidad.edu');
      `);
      
      await client.query(`
        INSERT INTO tasks (user_id, title, status) VALUES 
        (1, 'Terminar la implementación del backend', 'completed'),
        (1, 'Configurar el dominio en Railway', 'pending'),
        (2, 'Revisar la arquitectura del código', 'pending');
      `);
      console.log('Datos de ejemplo insertados.');
    }

    console.log('Base de datos configurada correctamente.');
  } catch (err) {
    console.error('Error configurando la base de datos:', err);
  } finally {
    client.release();
    process.exit();
  }
};

createTables();
