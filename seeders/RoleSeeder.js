// import models
const Role = require('../models/Role')

exports.seeds = () => {
    // count data inside role collection
    Role.estimatedDocumentCount((err, count) => {
        // if empty role
        if(!err && count === 0){
            // create User role
            new Role({
                name: "User"
            }).save((err) => {
                if(err){
                    console.log("error", err)
                }
                console.log("added role 'User' to roles collection")
            })

            // create Moderator role
            new Role({
                name: "Moderator"
            }).save((err) => {
                if(err){
                    console.log("error", err)
                }
                console.log("added role 'Moderator' to roles collection")
            })

            // create Admin role
            new Role({
                name: "Admin"
            }).save((err) => {
                if(err){
                    console.log("error", err)
                }
                console.log("added role 'Admin' to roles collection")
            })
        }
    })
}