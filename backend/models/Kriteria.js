const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kriteriaSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        namaKriteria: {
            type: String,
            required: true
        },
        rootId: {
            type: String
        },
        createdAt: {
            type: Date
        },
        createdBy: {
            type: String,
            required: true
        },
        updatedBy: {
            type: String,
            required: true
        },
        updatedAt: {
            type: Date
        }
    },
    {
        collection: 'kriteria',
        _id: false,
        timestamps: false,
        strict: false
    }
)

const Kriteria = mongoose.model('Kriteria', kriteriaSchema)
module.exports = Kriteria