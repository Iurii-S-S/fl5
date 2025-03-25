const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM('новая', 'в процессе', 'завершена'),
        defaultValue: 'новая',
    },
    dueDate: {
        type: DataTypes.DATE,
    },
    reminder: {
        type: DataTypes.DATE,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Task;