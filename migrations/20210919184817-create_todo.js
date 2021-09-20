'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     *
     */
    await queryInterface.createTable('todo', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unsigned: true,
        zeroFill: true,
        primaryKey: true,
        field: 'id'
      },
      todo_thing: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'todo_thing'
      },
      do_date: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'date'
      },
      do_time: {
        type: Sequelize.TIME,
        allowNull: true,
        field: 'time'
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
    await queryInterface.dropTable('todo');
  }
};
