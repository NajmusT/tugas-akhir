const Sekolah = require('../models/Sekolah')
const router = require('express').Router()

const { v1: uuidv1 } = require('uuid');
const { protect } = require("../middlewares/authMiddlewares")

//create
router.route('/new').post((req, res) => {
    const sekolahBaru = new Sekolah({ _id: uuidv1(), ...req.body })
    sekolahBaru.save()
        .then(sekolah => res.json(sekolah))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get(protect, (req, res) => {
    // using .find() without a parameter will match on all Schools instances
    Sekolah.find()
        .then(semuaSekolah => res.json(semuaSekolah))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve mine
router.route('/mine').get(protect, (req, res) => {
    // using .find() without a parameter will match on all Prasarana instances
    Sekolah.find({ createdBy: req.user._id })
        .then(semuaSekolah => res.json(semuaSekolah))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve some
router.get("/:id", protect, (req, res, next) => {
    Sekolah.findById(req.params.id)
        .then(sekolah => res.json(sekolah))
        .catch(err => next(err));
});

//delete
router.route('/delete/:id').delete(protect, (req, res) => {
    Sekolah.deleteOne({ _id: req.params.id })
        .then(success => res.json(`Sukses! Data sekolah telah dihapus.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put(protect, (req, res) => {
    Sekolah.findByIdAndUpdate(req.params.id, req.body)
        .then(sekolah => res.json(`Sukses! Data sekolah ${sekolah.nama} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;