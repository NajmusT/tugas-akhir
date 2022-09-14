const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schoolSchema = new Schema(
    {
        _id: {
            type: String
        },
        npsn: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        address: {
            street: {
                type: String,
                required: true
            },
            postalCode: {
                type: Number
            }
        },
        headmaster: {
            type: String,
            required: true
        },
        surfaceArea: {
            owned: {
                type: Number,
                required: true
            },
            notOwned: {
                type: Number,
                default: 0
            }
        },
        schoolTimeType: {
            type: String
        },
        bossParticipation: {
            type: Boolean
        },
        managementBased: {
            type: Boolean
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

const School = mongoose.model('School', schoolSchema)
module.exports = School