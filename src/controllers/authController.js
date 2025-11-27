const { User } = require('../models');
const bcrypt = require('bcrypt');

// Menampilkan halaman login
exports.showLoginForm = (req, res) => {
  res.render('login', { 
    title: 'Login Admin', 
    layout: './layouts/login', // Gunakan layout khusus login
    error: null 
  });
};

// Proses login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (user && await user.validPassword(password)) {
      // Sukses login, simpan user id di session
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      res.redirect('/');
    } else {
      // Gagal login
      res.render('login', { 
        title: 'Login Admin', 
        layout: './layouts/login',
        error: 'Email atau password salah.' 
      });
    }
  } catch (error) {
    console.error(error);
    res.render('login', { 
      title: 'Login Admin', 
      layout: './layouts/login',
      error: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Proses logout
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};
