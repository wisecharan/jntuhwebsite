const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { isAuthenticated } = require('../middleware/auth');

// Login
router.get('/login', (req, res) => {
    res.render('admin_login', { error: null });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, async (err, results) => {
        if (err) throw err;
        if (results.length > 0 && await require('bcrypt').compare(password, results[0].password)) {
            req.session.admin = results[0];
            res.redirect('/admin/dashboard');
        } else {
            res.render('admin_login', { error: 'Invalid credentials' });
        }
    });
});

// Register
router.get('/register', (req, res) => {
    res.render('admin_register', { error: null });
});

router.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    User.create(username, password, email, (err) => {
        if (err) {
            res.render('admin_register', { error: 'Username or email already exists' });
        } else {
            res.redirect('/admin/login');
        }
    });
});

// Dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
    User.findAll((err, users) => {
        if (err) throw err;
        res.render('admin_dashboard', { users });
    });
});

// Verify user
router.post('/verify/:id', isAuthenticated, (req, res) => {
    User.verify(req.params.id, (err) => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
    });
});

// Delete user
router.post('/delete/:id', isAuthenticated, (req, res) => {
    User.delete(req.params.id, (err) => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

module.exports = router;
