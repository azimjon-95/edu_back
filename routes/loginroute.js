const express = require('express')
const { loginUser } = require('../controllers/userController')
const router = express.Router()

router.post('/login', loginUser)
console.log(router);
module.exports = router