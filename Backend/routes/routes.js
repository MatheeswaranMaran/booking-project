const express = require('express');

const router = express.Router();

const { registerUser,loginUser, searchUser, getHallData, updateHallStatus, updateUserData } = require('../controller/Controller');

router.post('/register',registerUser);

router.post('/login', loginUser);

router.post('/search',searchUser);

router.get("/",getHallData);

router.put("/update/:id", updateHallStatus);

router.put("/updateuser/:id",updateUserData);

module.exports = router;