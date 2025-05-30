const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: async (username, password, email, callback) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
            [username, hashedPassword, email], callback);
    },
    findByUsername: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    },
    findAll: (callback) => {
        db.query('SELECT * FROM users', callback);
    },
    verify: (id, callback) => {
        db.query('UPDATE users SET is_verified = TRUE WHERE id = ?', [id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    }
};

module.exports = User;