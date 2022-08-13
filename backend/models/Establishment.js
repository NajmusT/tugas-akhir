const mongoose = require('mongoose')
const Schema = mongoose.Schema

const establishmentSchema = new Schema(
    {
        _id: {
            type: String
        },
        schoolId: {
            type: String,
            required: true
        },
        number: {
            type: String
        },
        date: {
            type: String
        },
        createdBy: {
            type: String
        },
        updatedBy: {
            type: String
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    },
    {
        _id: false,
        timestamps: false
    }
)

const Establishment = mongoose.model('Establishment', establishmentSchema)
module.exports = Establishment