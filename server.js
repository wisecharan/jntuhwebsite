const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const db = require('./config/db');
const { isAuthenticated } = require('./middleware/auth');
require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'jntu_secret_key_12345',
    resave: false,
    saveUninitialized: false
}));

// Routes
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});