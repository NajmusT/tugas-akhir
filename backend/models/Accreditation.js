const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accreditationSchema = new Schema(
    {
        _id: {
            type: String
        },
        schoolId: {
            type: String,
            required: true
        },
        letterValue: {
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

const Accreditation = mongoose.model('Accreditation', accreditationSchema)
module.exports = Accreditation