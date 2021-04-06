// import dependencies
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// register dotenv
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

// setting cors
const corsOptions = {
    origin: 'http://localhost:8081'
}
app.use(cors(corsOptions))

// import role seeder
const RoleSeeder = require('./seeders/RoleSeeder')

// setting mongoose
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB')

        // Seed
        RoleSeeder.seeds()
    })
    .catch(err => {
        console.log(err)
    })

// setting body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: true }))

// register route
const router = require('./router/api')
app.use('/', router)

// run server
app.listen(process.env.PORT || 8080)