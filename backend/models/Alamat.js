const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alamatSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        kodePos: {
            type: Number,
            required: true
        },
        desaKelurahan: {
            type: String,
            required: true
        },
        kecamatan: {
            type: String,
            required: true
        }
    },
    {
        collection: 'alamat',
        _id: false,
        timestamps: false,
        strict: false
    }
)

const Alamat = mongoose.model('Alamat', alamatSchema)
module.exports = Alamat