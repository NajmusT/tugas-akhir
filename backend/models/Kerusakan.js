const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kerusakanSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        idSekolah: {
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
            url: {
                type: String,
                required: true
            },
            fileName: {
                type: String,
                required: true
            }
        },
        deskripsi: {
            type: String
        },
        createdBy: {
            type: String,
            required: true
        },
        createdAt: {
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