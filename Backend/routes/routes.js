const express = require('express');

const router = express.Router();

const { registerUser,loginUser, searchUser, getData,updateHallStatus } = require('../controller/Controller');

router.post('/register',registerUser);

router.post('/login', loginUser);

router.post('/search',searchUser);

router.get("/",getData);

router.put("/update/:id", updateHallStatus);


module.exports = router;