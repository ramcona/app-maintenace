'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArchiveConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArchiveConfig.init({
    database_name: DataTypes.STRING,
    schema_name: DataTypes.STRING,
    table_name: DataTypes.STRING,
    reference_column: DataTypes.STRING,
    demarcation_value: DataTypes.STRING,
    action_on_main: DataTypes.STRING,
    action_on_archive: DataTypes.STRING,
    description: DataTypes.TEXT,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ArchiveConfig',
  });
  return ArchiveConfig;
};