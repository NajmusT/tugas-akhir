const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saranaSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        idPrasarana: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Prasarana'
        },
        nama: {
            type: String,
            required: true
        },
        foto: {
            url: {
                type: String,
            },
            fileName: {
                type: String,
            }
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
            type: String,
            required: true
        },
        updatedBy: {
            type: String,
            required: true
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