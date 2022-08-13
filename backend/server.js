const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
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
const userRoutes = require('./controllers/UserController')
const accreditationRoutes = require('./controllers/AccreditationController')
const addressRoutes = require('./controllers/AddressController')
const establishmentRoutes = require('./controllers/EstablishmentController')
const infrastructureRoutes = require('./controllers/InfrastructureController')
const inventoryRoutes = require('./controllers/InventoryController')
const operatingLicenseRoutes = require('./controllers/OperatingLicenseController')
const schoolRoutes = require('./controllers/SchoolController')
const studyGroupRoutes = require('./controllers/StudyGroupController')

app.use('/users', userRoutes)
app.use('/accreditations', accreditationRoutes)
app.use('/addresses', addressRoutes)
app.use('/establishments', establishmentRoutes)
app.use('/infrastructures', infrastructureRoutes)
app.use('/inventories', inventoryRoutes)
app.use('/operatingLicenses', operatingLicenseRoutes)
app.use('/schools', schoolRoutes)
app.use('/studyGroups', studyGroupRoutes)