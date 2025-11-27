'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityLog.init({
    level: DataTypes.STRING, // INFO, WARNING, ERROR
    source: DataTypes.STRING, // WEB_APP, AIRFLOW_DAG
    message: DataTypes.TEXT,
    details: DataTypes.JSONB,
    user_email: DataTypes.STRING // Email user yang melakukan aksi jika ada
  }, {
    sequelize,
    modelName: 'ActivityLog',
  });
  return ActivityLog;
};