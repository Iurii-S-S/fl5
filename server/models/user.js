const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User ', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Хеширование пароля перед сохранением
User .beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 8);
});

// Метод для сравнения паролей
User .prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;