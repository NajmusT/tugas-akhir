const Kerusakan = require('../models/Kerusakan')
const router = require('express').Router()
const path = require("path")
const fs = require("fs")
const { v1: uuidv1 } = require('uuid');

//create
router.route('/new').post((req, res) => {
    const file = req.files != null ? req.files.file : null
    const ext = file != null ? path.extname(file.name) : null
    const fileName = file != null ? (file.md5 + ext) : null
    const url = `${req.protocol}`
    const allowedType = ['.png', '.jpg', '.jpeg'];

    const kerusakanBaru = new Kerusakan({
        _id: uuidv1(),
        idSarana: req.body.idSarana,
        idPrasarana: req.body.idPrasarana,
        kondisi: req.body.kondisi,
        deskripsi: req.body.deskripsi,
        bukti: { url: url, fileName: fileName },
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

    kerusakanBaru.save()
        .then(kerusakan => res.json(kerusakan))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Schools instances
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