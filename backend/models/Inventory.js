const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema(
    {
        _id: {
            type: String
        },
        infrastructureId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        picture: {
            type: String
        },
        numOfItems: {
            amount: {
                type: Number,
                required: true
            },
            unitOfMeasure: {
                type: String,
                default: 'buah'
            }
        },
        description: {
            material: {
                type: String
            },
            size: {
                type: String
            },
            otherInformation: {
                type: String
            }
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
        timestamps: false,
        strict: false
    }
)

const Inventory = mongoose.model('Inventory', inventorySchema)
module.exports = Inventory