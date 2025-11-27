// middleware/auth.js
module.exports = (req, res, next) => {
  // Cek jika session user ada (artinya sudah login)
  if (req.session && req.session.userId) {
    return next();
  } else {
    // Jika tidak ada session, redirect ke halaman login
    return res.redirect('/login');
  }
};
