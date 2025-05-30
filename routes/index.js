const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/administration', (req, res) => {
    res.render('administration');
});

router.get('/academics', (req, res) => {
    res.render('academics');
});

router.get('/awards', (req, res) => {
    res.render('awards');
});

router.get('/directorates', (req, res) => {
    res.render('directorates');
});

module.exports = router;
