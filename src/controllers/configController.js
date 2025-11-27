const { ArchiveConfig, ActivityLog } = require('../models');

// Menampilkan semua konfigurasi
exports.index = async (req, res) => {
  try {
    const configs = await ArchiveConfig.findAll({ order: [['createdAt', 'DESC']] });
    res.render('config/index', { title: 'Manajemen Konfigurasi', configs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error memuat halaman konfigurasi.");
  }
};

// Menampilkan form untuk membuat konfigurasi baru
exports.create = (req, res) => {
  res.render('config/create', { title: 'Tambah Konfigurasi Baru' });
};

// Menyimpan konfigurasi baru
exports.store = async (req, res) => {
  try {
    await ArchiveConfig.create(req.body);
    await ActivityLog.create({
      level: 'INFO',
      source: 'WEB_APP',
      message: `Konfigurasi baru ditambahkan: ${req.body.table_name}`,
      user_email: req.session.userEmail
    });
    res.redirect('/config');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error menyimpan konfigurasi.");
  }
};

// Menampilkan form untuk edit konfigurasi
exports.edit = async (req, res) => {
  try {
    const config = await ArchiveConfig.findByPk(req.params.id);
    res.render('config/edit', { title: 'Edit Konfigurasi', config });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error memuat halaman edit.");
  }
};

// Mengupdate konfigurasi
exports.update = async (req, res) => {
  try {
    await ArchiveConfig.update(req.body, { where: { id: req.params.id } });
    await ActivityLog.create({
      level: 'INFO',
      source: 'WEB_APP',
      message: `Konfigurasi diperbarui: ${req.body.table_name}`,
      user_email: req.session.userEmail
    });
    res.redirect('/config');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error mengupdate konfigurasi.");
  }
};

// Menghapus konfigurasi
exports.destroy = async (req, res) => {
  try {
    const config = await ArchiveConfig.findByPk(req.params.id);
    await config.destroy();
    await ActivityLog.create({
      level: 'WARNING',
      source: 'WEB_APP',
      message: `Konfigurasi dihapus: ${config.table_name}`,
      user_email: req.session.userEmail
    });
    res.redirect('/config');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error menghapus konfigurasi.");
  }
};
