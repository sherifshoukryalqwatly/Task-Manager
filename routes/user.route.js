const express = require('express');
const router =  express.Router();

const {
    signUp,
    getAllUsers,
    updateUser,
    deleteAllUsers,
    deleteUser,
    login
} = require('../controllers/user.controller.js');

router.post('/',signUp);
router.get('/',getAllUsers);
router.patch('/:id',updateUser);
router.delete('/',deleteAllUsers);
router.delete('/:id',deleteUser);
router.post('/login',login);

module.exports = router;