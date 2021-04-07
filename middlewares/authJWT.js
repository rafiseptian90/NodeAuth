const jwt = require('jsonwebtoken')
const config = require('../auth.config')
const User = require('../models/User')
const Role = require('../models/Role')

const verifyToken = (req, res, next) => {
    let token = req.headers['Authorization']

    if(!token){
        return res.status(401).send({ message: "No token provided!" })
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if(err){
            return res.status(401).send({ message: 'Unauthorized!' })
        }
        req.userId = decoded.id

        next()
    })
}

const isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }

            Role.find({
                _id: { $in: user.roles }
            }, (err, roles) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }

                for(let i = 0; i < roles.length; i++){
                    if(roles[i].name === 'admin'){
                        return next()
                    }
                }

                return res.status(403).send({ message: 'Require admin role!' })
            })
        })
}

const isModerator = (req, res, next) => {
    User.findById(req.userId)
        .exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }

            Role.find({
                _id: { $in: user.roles }
            }, (err, roles) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }

                for(let i = 0; i < roles.length; i++){
                    if(roles[i].name === 'moderator'){
                        return next()
                    }
                }

                return res.status(403).send({ message: 'Require moderator role!' })
            })
        })
}

const authJWT = {
    verifyToken,
    isAdmin,
    isModerator
}

module.exports = authJWT