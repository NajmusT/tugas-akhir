const Sarana = require('../models/Sarana')
const router = require('express').Router()
const path = require("path")
const fs = require("fs")
const { v1: uuidv1 } = require('uuid');
const moment = require("moment")

//create
router.route('/new').post((req, res) => {
    const file = req.files === null ? null : req.files.file
    const ext = file != null ? path.extname(file.name) : ''
    const fileName = file != null ? (file.md5 + ext) : ''
    const url = `${req.protocol}`
    const allowedType = ['.png', '.jpg', '.jpeg'];

    const saranaBaru = new Sarana({
        _id: uuidv1(),
        idPrasarana: req.body.idPrasarana,
        nama: req.body.nama,
        foto: { url: url, fileName: fileName },
        jumlah: JSON.parse(req.body.jumlah),
        kondisi: req.body.kondisi,
        jenis: req.body.jenis,
        deskripsi: req.body.deskripsi,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy,
        createdAt: moment(),
        updatedBy: moment()
    })

    if (req.files != null) {
        if (allowedType.includes(ext.toLowerCase())) {
            file.mv(`./public/images/${fileName}`, async (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            })
        } else { return res.status(400).json("Tipe file tidak valid") }
    }

    saranaBaru.save()
        .then(sarana => res.json(sarana))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Inventories instances
    Sarana.find()
        .then(semuaSarana => res.json(semuaSarana))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve mine
router.route('/mine').get((req, res) => {
    // using .find() without a parameter will match on all Prasarana instances
    Sarana.find({ createdBy: req.user._id })
        .then(semuaSarana => res.json(semuaSarana))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve some
router.get("/:id", (req, res, next) => {
    Sarana.findById(req.params.id)
        .then(sarana => res.json(sarana))
        .catch(err => next(err));
});

//delete
router.route('/delete/:id').delete((req, res) => {
    Sarana.deleteOne({ _id: req.params.id })
        .then(success => res.json('Sukses! Data sarana telah dihapus.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').post(async (req, res) => {
    const sarana = await Sarana.findById(req.params.id)

    if (!sarana) { return res.status(400).json("No data found") }

    if (req.files === null) {
        sarana.foto = sarana.foto
    } else {
        const file = req.files.file;
        const ext = path.extname(file.name);
        const url = `${req.protocol}`
        const fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (allowedType.includes(ext.toLowerCase())) {
            file.mv(`./public/images/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });

            sarana.foto = { url: url, fileName: fileName }
        } else {
            return res.status(400).json("Tipe file tidak valid")
        }
    }

    sarana.nama = req.body.nama
    sarana.idPrasarana = req.body.idPrasarana
    sarana.kondisi = req.body.kondisi
    sarana.jumlah = JSON.parse(req.body.jumlah)
    sarana.jenis = req.body.jenis
    sarana.updatedAt = moment()

    sarana.save()
        .then(sarana => res.json(`Sukses! Data sarana ${sarana.nama} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;