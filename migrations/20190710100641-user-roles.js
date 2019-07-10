'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'roles', {
          type: Sequelize.ARRAY(Sequelize.TEXT)
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'enabled', {
          type: Sequelize.ENUM(true, false)
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'locked', {
          type: Sequelize.ENUM(true, false)
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'lastLoginAt', {
          type: Sequelize.DATE
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'ipAddress', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'phone', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'avatar', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'country', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'confirmationToken', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'passwordRequestAt', {
          type: Sequelize.DATE
        }, { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'roles', { transaction: t }),
        queryInterface.removeColumn('Users', 'enabled', { transaction: t }),
        queryInterface.removeColumn('Users', 'locked', { transaction: t }),
        queryInterface.removeColumn('Users', 'lastLoginAt', { transaction: t }),
        queryInterface.removeColumn('Users', 'ipAddress', { transaction: t }),
        queryInterface.removeColumn('Users', 'phone', { transaction: t }),
        queryInterface.removeColumn('Users', 'avatar', { transaction: t }),
        queryInterface.removeColumn('Users', 'country', { transaction: t }),
        queryInterface.removeColumn('Users', 'confirmationToken', { transaction: t }),
        queryInterface.removeColumn('Users', 'passwordRequestAt', { transaction: t }),

        // Drop ENUM TYPES on postgres
        queryInterface.sequelize.query(`
          DROP TYPE "enum_Users_enabled";
          DROP TYPE "enum_Users_locked";
        `)
      ]);
    });
  }
};
