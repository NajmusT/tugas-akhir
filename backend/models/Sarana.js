const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saranaSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        idPrasarana: {
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
        jumlah: {
            kuantitas: {
                type: Number,
                required: true
            },
            satuan: {
                type: String,
                default: 'buah'
            }
        },
        kondisi: {
            type: String,
            required: true
        },
        jenis: {
            type: String,
            required: true
        },
        deskripsi: {
            bahan: {
                type: String
            },
            ukuran: {
                type: String
            },
            keteranganLain: {
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
        collection: 'sarana',
        _id: false,
        timestamps: false,
        strict: false
    }
)

const Sarana = mongoose.model('Sarana', saranaSchema)
module.exports = Sarana