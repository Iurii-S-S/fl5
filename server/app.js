const express = require('express');
const sequelize = require('./config/database');
const Task = require('./models/task');
const User = require('./models/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Синхронизация моделей с базой данных
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с базой данных установлено.');

        // Создание таблиц, если они не существуют
        await sequelize.sync();
        console.log('Все модели были синхронизированы с базой данных.');
    } catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
};

initializeDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});