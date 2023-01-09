const Sekolah = require('../models/Sekolah')
const router = require('express').Router()
const path = require("path")
const fs = require("fs")

const { v1: uuidv1 } = require('uuid');

//create
router.post('/new', (req, res) => {
    const file = req.files.file
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}`
    const allowedType = ['.png', '.jpg', '.jpeg'];

    const sekolahBaru = new Sekolah({
        _id: uuidv1(),
        fotoSekolah: {
            url: url,
            fileName: fileName
        },
        nama: req.body.nama,
        npsn: req.body.npsn,
        jenis: req.body.jenis,
        alamat: JSON.parse(req.body.alamat),
        kepalaSekolah: req.body.kepalaSekolah,
        ketuaKomite: req.body.ketuaKomite,
        akreditasi: JSON.parse(req.body.akreditasi),
        pendirian: JSON.parse(req.body.pendirian),
        izinOperasional: JSON.parse(req.body.izinOperasional),
        lahan: JSON.parse(req.body.lahan),
        bantuanPengadaan: req.body.bantuanPengadaan,
        rombonganBelajar: req.body.rombonganBelajar,
        jumlahGuru: req.body.jumlahGuru,
        createdAt: req.body.createdAt,
        createdBy: req.body.createdBy,
        updatedAt: req.body.updatedAt,
        updatedBy: req.body.updatedBy
    })

    if (allowedType.includes(ext.toLowerCase())) {
        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
            sekolahBaru.save()
                .then(sekolah => res.json(sekolah))
                .catch(err => res.status(400).json("Error! " + err))
        })
    } else {
        return res.status(400).json("Tipe file tidak valid")
    }
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Schools instances
    Sekolah.find()
        .then(semuaSekolah => res.json(semuaSekolah))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve mine
router.route('/mine').get((req, res) => {
    // using .find() without a parameter will match on all Prasarana instances
    Sekolah.find({ createdBy: req.user._id })
        .then(semuaSekolah => res.json(semuaSekolah))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve some
router.get("/:id", (req, res, next) => {
    Sekolah.findById(req.params.id)
        .then(sekolah => res.json(sekolah))
        .catch(err => next(err));
});

//delete
router.route('/delete/:id').delete((req, res) => {
    const sekolah = Sekolah.findOne({ id: req.params.id })
    const filepath = `./public/images/${sekolah.fotoSekolah.fileName}`;
    fs.unlinkSync(filepath);

    Sekolah.deleteOne({ _id: req.params.id })
        .then(success => res.json(`Sukses! Data sekolah telah dihapus.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    const sekolah = Sekolah.findOne({ id: req.params.id })

    if (!sekolah) {
        return res.status(400).json("No data found")
    }

    let fileName = ""
    let url = ""

    if (req.file === null) {
        fileName = sekolah.fotoSekolah.fileName
        url = sekolah.fotoSekolah.url
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        url = `${req.protocol}`
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (allowedType.includes(ext.toLowerCase())) {
            const filepath = `./public/images/${sekolah.fotoSekolah.fileName}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/images/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });

        } else {
            return res.status(400).json("Tipe file tidak valid")
        }
    }

    req.body.fotoSekolah.url = url
    req.body.fotoSekolah.fileName = fileName

    Sekolah.findOneAndUpdate(req.params.id, req.body)
        .then(sekolah => res.json(`Sukses! Data sekolah ${sekolah.nama} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;