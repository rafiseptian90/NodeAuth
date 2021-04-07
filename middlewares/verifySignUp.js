const User = require('../models/User')
const Role = require('../models/Role')

const checkDuplicateUsernameEmail = (req, res, next) => {
    // check existing username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err){
            res.status(500).send({ message : err })
            return
        }

        // if user found
        if(user){
            res.status(422).send({ message: 'Username already used !' })
        }

        // check existing email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({message: err})
                return
            }

            // if user found
            if (user) {
                res.status(422).send({message: 'Email already used !'})
            }

            next()
        })
    })
}

const checkExistingRole = (req, res, next) => {
    // available role
    const availableRoles = ['user', 'admin', 'moderator']
    const { body : { roles } } = req;

    if(req.body.roles){
        for(let i = 0; i < roles.length; i ++){
            // check unavailable role at request
            if(!availableRoles.includes(roles[i])){
                res.status(422).send({ message: `Role ${roles[i]} doesn't exists!` })
                return
            }
        }
    }

    next()
}

const verifySignUp = {
    checkDuplicateUsernameEmail,
    checkExistingRole
}

module.exports = verifySignUp