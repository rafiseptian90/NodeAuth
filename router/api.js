const express = require('express')
const Route = express.Router()

Route.get('/', (req, res) => {
    res.json({
        message: 'Hello World !'
    })
})

module.exports = Route