const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kerusakanSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        idSarana: {
            type: String
        },
        idPrasarana: {
            type: String,
            required: true
        },
        kondisi: {
            type: String,
            required: true
        },
        bukti: {
            type: String,
            required: true
        },
        deskripsi: {
            type: String
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    },
    {
        collection: 'kerusakan',
        _id: false,
        timestamps: false
    }
)

const Kerusakan = mongoose.model('Kerusakan', kerusakanSchema)
module.exports = Kerusakan