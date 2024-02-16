//routes/userRoutes.js
const Router = require('express');
const router = new Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const path = require("path");
const express = require("express");


router.set('view engine', 'ejs');
router.set('views', './ui/html');
router.use(express.static('./ui/static'));

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', [
    check('username', "Username can not be empty").notEmpty(),
    check('password', "Password be higher than 4 and less than 10").isLength({min: 4, max: 10})
], userController.registration);
router.post('/login', userController.login);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/userspage', authMiddleware, userController.getUsersPage);


module.exports = router;
