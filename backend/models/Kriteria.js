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
        bobotKriteria: {
            type: Number,
            required: true
        },
        jenis: {
            type: String,
            required: true
        },
        penilaianKriteria: {
            kriteriaPembanding: {
                type: String,
                required: true
            },
            skalaPenilaian: {
                type: Number,
                required: true
            }
        },
        rootId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Kriteria'
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
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