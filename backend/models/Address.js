const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema(
    {
        postalCode: {
            type: Number,
            required: true
        },
        village: {
            type: String,
            required: true
        },
        subDistrict: {
            type: String,
            required: true
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

const Address = mongoose.model('Address', addressSchema)
module.exports = Address