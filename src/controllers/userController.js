const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'SELECT u.name, t.title, t.status FROM users u JOIN tasks t ON u.id = t.user_id WHERE u.id = $1',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
