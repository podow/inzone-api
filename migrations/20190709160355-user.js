'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      queryInterface.addColumn('Users', 'salt', {
        type: Sequelize.STRING
      }, { transaction: t });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      queryInterface.removeColumn('Users', 'salt', { transaction: t });
    });
  }
};
