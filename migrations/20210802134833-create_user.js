'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     *
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unsigned: true,
        zeroFill: true,
        primaryKey: true,
        field: 'id'
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'first_name'
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'last_name'
      },

      role: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'role'
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {isEmail: {msg: "Email Id is invalid."}},
        field: 'email'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'password'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
      },
      is_admin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_admin'
      },

      last_login_at: {
        type: Sequelize.DATE(3)
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
    await queryInterface.dropTable('users');
  }
};
