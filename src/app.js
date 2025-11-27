require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routes');

const app = express();
const port = process.env.APP_PORT || 3000;

// Konfigurasi EJS
app.use(expressLayouts);
app.set('layout', './layouts/main'); // akan dibuat nanti
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../public'))); // Untuk file statis seperti CSS/JS Bootstrap

// Konfigurasi Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set 'true' jika menggunakan HTTPS
}));

// Middleware untuk expose session ke views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Routes
app.use('/', routes);

// Jalankan Server
app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});

module.exports = app;
