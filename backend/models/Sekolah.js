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
            luas: {
                type: Number,
                required: true
            },
            kepemilikan: {
                type: String,
                required: true
            }
        },
        bantuanPengadaan: {
            type: String
        },
        rombonganBelajar: {
            nama: {
                type: String
            },
            tingkat: {
                type: Number
            },
            jumlahMurid: {
                type: Number
            }
        },
        jumlahGuru: {
            type: Number
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
        collection: 'sekolah',
        _id: false,
        timestamps: false
    }
)

const Sekolah = mongoose.model('Sekolah', sekolahSchema)
module.exports = Sekolah