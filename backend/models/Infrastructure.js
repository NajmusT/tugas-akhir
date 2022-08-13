const mongoose = require('mongoose')
const Schema = mongoose.Schema

const infrastructureSchema = new Schema(
    {
        _id: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        schoolId: {
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

const Infrastructure = mongoose.model('Infrastructure', infrastructureSchema)
module.exports = Infrastructure