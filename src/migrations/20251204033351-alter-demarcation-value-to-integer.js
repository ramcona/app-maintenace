'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Add a new column with the desired type
    await queryInterface.addColumn('ArchiveConfigs', 'demarcation_value_temp', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // 2. Copy data from the old column to the new column (with conversion if necessary)
    // Since old values are dates and new are integers (days), we'll set existing to NULL
    // or a default if a conversion logic is provided by the user.
    // For now, we assume existing date strings cannot be directly converted to days.
    // If there's a specific conversion logic for existing data, it should be implemented here.
    // Example: await queryInterface.sequelize.query('UPDATE "ArchiveConfigs" SET "demarcation_value_temp" = CAST("demarcation_value" AS INTEGER) WHERE "demarcation_value" IS NOT NULL;');

    // 3. Remove the old column
    await queryInterface.removeColumn('ArchiveConfigs', 'demarcation_value');

    // 4. Rename the new column to the original column name
    await queryInterface.renameColumn('ArchiveConfigs', 'demarcation_value_temp', 'demarcation_value');
  },

  async down (queryInterface, Sequelize) {
    // Revert the changes in the down function
    // 1. Add a new column with the original type
    await queryInterface.addColumn('ArchiveConfigs', 'demarcation_value_temp', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // 2. Copy data from the current integer column to the new string column
    // If there was a specific conversion from integer to date string, it should be implemented here.
    // For now, we'll just cast the integer to string.
    await queryInterface.sequelize.query('UPDATE "ArchiveConfigs" SET "demarcation_value_temp" = CAST("demarcation_value" AS TEXT) WHERE "demarcation_value" IS NOT NULL;');

    // 3. Remove the current column
    await queryInterface.removeColumn('ArchiveConfigs', 'demarcation_value');

    // 4. Rename the new column to the original column name
    await queryInterface.renameColumn('ArchiveConfigs', 'demarcation_value_temp', 'demarcation_value');
  }
};
