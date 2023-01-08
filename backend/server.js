const express = require('express')
const FileUpload = require("express-fileupload");
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

require('dotenv').config()

//Passport middleware
app.use(passport.initialize())
app.use(FileUpload());
app.use(cors())
app.use(express.json())

//MongoDB Atlas Connection
const PORT = process.env.PORT || 5000
const source = process.env.ATLAS_CONNECTION

mongoose.connect(source, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("DB connected.");
})

app.listen(PORT, () => {
    console.log(`Successfully served on port: ${PORT}.`);
})

//routes
const alamatRoute = require('./controllers/AlamatController')
const kerusakanRoute = require('./controllers/KerusakanController')
const kriteriaRoute = require('./controllers/KriteriaController')
const prasaranaRoute = require('./controllers/PrasaranaController')
const saranaRoute = require('./controllers/SaranaController')
const sekolahRoute = require('./controllers/SekolahController')
const userRoute = require('./controllers/UserController')

app.use('/alamat', alamatRoute)
app.use('/kerusakan', kerusakanRoute)
app.use('/kriteria', kriteriaRoute)
app.use('/prasarana', prasaranaRoute)
app.use('/sarana', saranaRoute)
app.use('/sekolah', sekolahRoute)
app.use('/user', userRoute)