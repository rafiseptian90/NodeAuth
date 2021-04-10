const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../auth.config')

const User = require('../models/User')
const Role = require('../models/Role')

exports.register = (req, res) => {
    // grab user request
    const { body } = req

    const StoreUser = new User({
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    })

    StoreUser.save((err, user) => {
        if(err){
            return res.status(500).send({message: err})
        }

        // if req has a roles
        if(body.roles){
            Role.find({
                name: { $in: body.roles }
            }, (err, roles) => {
                if(err){
                    return res.status(500).send({message: err})
                }

                // save role to new user
                user.roles = roles.map((role) => role._id)
                user.save(err => {
                    if(err){
                        return res.status(500).send({message: err})
                    }

                    return res.send({ message: 'Register successfully !' })
                })
            })
        }
        // give default role to user
        else {
            Role.findOne({
                name: "User"
            }, (err, role) => {
                if(err){
                    return res.status(500).send({message: err})
                }

                user.roles = [role._id]
                user.save((err, user) => {
                    if(err){
                        return res.status(500).send({message: err})
                    }

                    return res.send({ message: 'Register successfully !' })
                })
            })
        }
    })
}

exports.login = (req, res) => {
    const { body } = req

    User.findOne({
        username: body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if(err){
                return res.status(500).send({ message: err })
            }

            // check is valid password
            const credentials = bcrypt.compareSync(body.password, user.password)

            if(!credentials){
                return res.status(401).send({ message: "Invalid password !" })
            }

            // set token expires
            const token = JWT.sign({id: user.id}, config.secretKey, {
                expiresIn: '24h' // 24 hours
            })

            // set authorities
            const authorities = []
            user.roles.map((role) => {
                authorities.push(`ROLE_${role.name.toUpperCase()}`)
            })

            // throw response
            return res.send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
}