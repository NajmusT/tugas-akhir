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
            type: String
        },
        createdAt: {
            type: Date
        },

        createdBy: {
            type: String
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