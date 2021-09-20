 'use strict';
const BaseModel = require("./BaseModel");

class ToDo extends BaseModel {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unsigned: true,
                zeroFill: true,
                primaryKey: true,
                field: 'id'
            },
            todo_thing: {
                type: DataTypes.STRING,
                defaultValue: true,
                field: 'todo_thing'
            },
            do_date: {
                type: DataTypes.DATE,
                defaultValue: true,
                field: 'date'
            },
            do_time: {
                type: DataTypes.TIME,
                defaultValue: true,
                field: 'time'
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                field: 'is_active'
            }
        },
            {
            sequelize: sequelize,
            modelName: 'Todo',
            tableName: 'todo',
            timestamps: false,
            underscored: true
        });
    };

    static associate(models) {
        this.addScope('defaultScope', {
            order: [['id', 'ASC']],
        }, {override: true});
    }
}

module.exports = ToDo;