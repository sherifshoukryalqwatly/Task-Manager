const express = require('express');

const router = express.Router();

const {
    createTask,
    updateTask,
    deleteAllTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    findTaskByTitle
} = require('../controllers/task.controller.js');

router.post('/',createTask);
router.patch('/:id',updateTask);
router.delete('/',deleteAllTask);
router.delete('/:id',deleteTask);
router.get('/',getAllTasks);
router.get('/:id',getTaskById);
router.get('/search',findTaskByTitle);

module.exports = router;
