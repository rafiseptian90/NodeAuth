const express = require('express')
const Route = express.Router()

Route.get('/', (req, res) => {
    res.json({
        message: 'Hello World !'
    })
})

// Auth endpoints
const AuthController = require('../controllers/AuthController')
Route.post('/register', AuthController.register)
Route.post('/login', AuthController.login)

module.exports = Route