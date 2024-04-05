const express = require('express');

const router = express.Router();

const { registerUser,loginUser, searchUser, getData } = require('../controller/Controller');

router.post('/register',registerUser);

router.post('/login', loginUser);

router.post('/search',searchUser);

router.get("/",getData)

module.exports = router;