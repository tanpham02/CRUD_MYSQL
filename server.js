const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const {connection, connectDB} = require('./server/model/modelInfoRes')

const app = express();

//load PORT
dotEnv.config({path: '.env'})
const PORT = process.env.PORT || 8080

// load request
app.use(morgan('dev'))

app.use(cors())

//Middle wards
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())


//connect DB
connectDB()

//load file static
app.use(express.static(path.resolve(__dirname, 'assets')))
app.use(express.static(path.resolve(__dirname, 'views')))  
                        // .join

//load router
app.use('/', require('./server/routes/routes'))



app.listen(PORT, () => {
    console.log(`Server running with http://localhost:${PORT}`)
})
