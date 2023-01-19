const Kerusakan = require('../models/Kerusakan')
const Sarana = require('../models/Sarana')
const Prasarana = require('../models/Prasarana')

const router = require('express').Router()
const path = require("path")
const fs = require("fs")
const moment = require("moment")
const { v1: uuidv1 } = require('uuid');

//create
router.route('/new').post(async (req, res) => {
    const file = req.files != null ? req.files.file : null
    const ext = file != null ? path.extname(file.name) : null
    const fileName = file != null ? (file.md5 + ext) : null
    const url = `${req.protocol}`
    const allowedType = ['.png', '.jpg', '.jpeg'];

    const kerusakanBaru = new Kerusakan({
        _id: uuidv1(),
        idSekolah: req.body.idSekolah,
        idSarana: req.body.idSarana,
        idPrasarana: req.body.idPrasarana,
        kondisi: req.body.kondisi,
        deskripsi: req.body.deskripsi,
        bukti: { url: url, fileName: fileName },
        createdBy: req.body.createdBy,
        createdAt: moment()
    })

    if (req.files != null) {
        if (allowedType.includes(ext.toLowerCase())) {
            file.mv(`./public/images/${fileName}`, async (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            })
        } else { return res.status(400).json("Tipe file tidak valid") }
    }

    kerusakanBaru.save()
        .then(kerusakan => res.json(kerusakan))
        .catch(err => res.status(400).json("Error! " + err))


    if (req.body.idSarana != 'null') {
        const sarana = await Sarana.findById(req.body.idSarana)

        if (!sarana) return res.status(400).send("Data sarana tidak ditemukan");

        sarana.kondisi = req.body.kondisi
        sarana.save()

        res.status(200).send({ message: "Sarana telah terupdate" })

    } else if (req.body.idSarana === 'null' && req.body.idPrasarana != 'null') {
        const prasarana = await Prasarana.findById(req.body.idPrasarana)

        if (!prasarana) return res.status(400).send("Data prasarana tidak ditemukan");

        prasarana.kondisi = req.body.kondisi
        prasarana.save()

        res.status(200).send({ message: "Prasarana telah terupdate" })
    }
})

//retrieve all
router.route('/').get((req, res) => {
    Kerusakan.find()
        .then(semuaKerusakan => res.json(semuaKerusakan))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve some
router.get("/:id", (req, res, next) => {
    Kerusakan.findById(req.params.id)
        .then(kerusakan => res.json(kerusakan))
        .catch(err => next(err));
});

//delete
router.route('/delete/:id').delete((req, res) => {
    Kerusakan.deleteOne({ _id: req.params.id })
        .then(success => res.json(`Sukses! Data Kerusakan telah dihapus.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    Kerusakan.findByIdAndUpdate(req.params.id, req.body)
        .then(kerusakan => res.json(`Sukses! Data Kerusakan ${kerusakan.nama} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;