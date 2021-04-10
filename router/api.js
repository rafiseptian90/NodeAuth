const express = require('express')
const app = express()
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

// access endpoint
const { authJWT } = require('../middlewares')
const UserController = require('../controllers/UserController')

app.use(function(req, res, next){
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
    )
    next()
})

Route.get('/access/all', UserController.allAccess)
Route.get('/access/user', [authJWT.verifyToken] , UserController.userAccess)
Route.get('/access/moderator',
            [authJWT.verifyToken, authJWT.isModerator],
            UserController.moderatorAccess
        )
Route.get('/access/admin', [authJWT.verifyToken, authJWT.isAdmin], UserController.adminAccess)

module.exports = Route