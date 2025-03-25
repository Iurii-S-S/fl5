const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Создание задачи
router.post('/', async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, userId: req.userId });
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Получение всех задач для конкретного пользователя
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.userId } });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Обновление задачи
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).send('Задача не найдена');

        await task.update(req.body);
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Удаление задачи
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).send('Задача не найдена');

        await task.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;