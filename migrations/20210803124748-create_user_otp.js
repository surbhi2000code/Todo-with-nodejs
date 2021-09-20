'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     *
     */
    await queryInterface.createTable('userOtp', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unsigned: true,
        zeroFill: true,
        primaryKey: true,
        field: 'id'
      },
      email: {
        type: Sequelize.STRING
      },
      otp_type: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unsigned: true
      },
      resend_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unsigned: true
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unsigned: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
      },
      created_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      },
      modified_at: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     *
     */
    await queryInterface.dropTable('user_otp');
  }
};
