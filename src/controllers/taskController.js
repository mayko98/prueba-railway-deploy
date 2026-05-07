const db = require('../config/db');

exports.createTask = async (req, res) => {
  try {
    const { user_id, title } = req.body;
    if (!user_id || !title) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (user_id, title)' });
    }
    const result = await db.query(
      'INSERT INTO tasks (user_id, title) VALUES ($1, $2) RETURNING *',
      [user_id, title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
