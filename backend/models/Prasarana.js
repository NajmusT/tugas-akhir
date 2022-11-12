const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prasaranaSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        nama: {
            type: String,
            required: true
        },
        foto: {
            type: String
        },
        jenis: {
            type: String,
            required: true
        },
        kondisi: {
            type: String,
            required: true
        },
        idSekolah: {
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
        collection: 'prasarana',
        _id: false,
        timestamps: false
    }
)

const Prasarana = mongoose.model('Prasarana', prasaranaSchema)
module.exports = Prasarana