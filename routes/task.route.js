const express = require('express');

const router = express.Router();
const authorization = require('../middelwares/authorization.js');

const {
    createTask,
    updateTask,
    deleteAllTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    findTaskByTitle
} = require('../controllers/task.controller.js');

router.post('/',authorization(["admin","user"]),createTask);
router.patch('/:id',authorization(["admin","user"]),updateTask);
router.delete('/',authorization(["admin","user"]),deleteAllTask);
router.delete('/:id',authorization(["admin","user"]),deleteTask);
router.get('/',authorization(["admin","user"]),getAllTasks);
router.get('/:id',authorization(["admin"]),getTaskById);
router.get('/search',authorization(["admin","user"]),findTaskByTitle);

module.exports = router;
