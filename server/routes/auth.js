const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });

    try {
        await user.save();
        res.status(201).send({ message: 'Пользователь зарегистрирован' });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Вход
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Неверные учетные данные' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;