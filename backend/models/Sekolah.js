const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sekolahSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        npsn: {
            type: String,
            required: true
        },
        nama: {
            type: String,
            required: true
        },
        jenis: {
            type: String,
            required: true
        },
        fotoSekolah: {
            type: String
        },
        alamat: {
            jalan: {
                type: String,
                required: true
            },
            kodePos: {
                type: Number,
                required: true
            }
        },
        kepalaSekolah: {
            type: String,
            required: true
        },
        ketuaKomite: {
            type: String,
            required: true
        },
        akreditasi: {
            noSK: {
                type: String
            },
            tanggal: {
                type: Date
            },
            nilaiHuruf: {
                type: String
            }
        },
        pendirian: {
            noSurat: {
                type: String
            },
            tanggal: {
                type: Date
            }
        },
        izinOperasional: {
            noSurat: {
                type: String
            },
            tanggal: {
                type: Date
            }
        },
        lahan: {
            kepemilikan: {
                type: String,
                required: true
            }
        },
        bantuanPengadaan: {
            type: String
        },
        rombonganBelajar: {
            type: Number
        },
        jumlahGuru: {
            type: Number
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
        collection: 'sekolah',
        _id: false,
        timestamps: false
    }
)

const Sekolah = mongoose.model('Sekolah', sekolahSchema)
module.exports = Sekolah