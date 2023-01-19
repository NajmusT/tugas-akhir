const Prasarana = require('../models/Prasarana')
const router = require('express').Router()
const path = require("path")
const fs = require("fs")
const moment = require("moment")
const { v1: uuidv1 } = require('uuid');

//create
router.route('/new').post((req, res) => {
    const file = req.files === null ? null : req.files.file
    const ext = file != null ? path.extname(file.name) : ''
    const fileName = file != null ? (file.md5 + ext) : ''
    const url = `${req.protocol}`
    const allowedType = ['.png', '.jpg', '.jpeg'];

    const prasaranaBaru = new Prasarana({
        _id: uuidv1(),
        nama: req.body.nama,
        foto: { url: url, fileName: fileName },
        jenis: req.body.jenis,
        kondisi: req.body.kondisi,
        idSekolah: req.body.idSekolah,
        createdBy: req.body.createdBy,
        createdAt: moment(),
        updatedBy: req.body.updatedBy,
        updatedAt: moment()
    })


    if (req.files != null) {
        if (allowedType.includes(ext.toLowerCase())) {
            file.mv(`./public/images/${fileName}`, async (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            })
        } else { return res.status(400).json("Tipe file tidak valid") }
    }

    prasaranaBaru.save()
        .then(prasarana => res.json(prasarana))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Prasarana instances
    Prasarana.find()
        .then(semuaPrasarana => res.json(semuaPrasarana))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve mine
router.route('/mine').get((req, res) => {
    // using .find() without a parameter will match on all Prasarana instances
    Prasarana.find({ createdBy: req.user._id })
        .then(semuaPrasarana => res.json(semuaPrasarana))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve some
router.get("/:id", (req, res, next) => {
    Prasarana.findById(req.params.id)
        .then(prasarana => res.json(prasarana))
        .catch(err => next(err));
});

//delete
router.route('/delete/:id').delete((req, res) => {
    Prasarana.deleteOne({ _id: req.params.id })
        .then(success => res.json(`Sukses! Data prasarana telah dihapus.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').post(async (req, res) => {
    const prasarana = await Prasarana.findById(req.params.id)

    if (!prasarana) { return res.status(400).json("No data found") }

    if (req.files === null) {
        prasarana.foto = prasarana.foto
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

            prasarana.foto = { url: url, fileName: fileName }
        } else {
            return res.status(400).json("Tipe file tidak valid")
        }
    }

    prasarana.nama = req.body.nama
    prasarana.jenis = req.body.jenis
    prasarana.kondisi = req.body.kondisi
    prasarana.idSekolah = req.body.idSekolah
    prasarana.updatedAt = moment()

    prasarana.save()
        .then(prasarana => res.json(`Sukses! Data prasarana ${prasarana.nama} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;