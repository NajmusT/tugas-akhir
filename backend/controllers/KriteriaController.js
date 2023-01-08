const Kriteria = require('../models/Kriteria')
const router = require('express').Router()

const { v1: uuidv1 } = require('uuid');
const { protect } = require("../middlewares/authMiddlewares")

//create
router.route('/new').post((req, res) => {
    const kriteriaBaru = new Kriteria({ _id: uuidv1(), ...req.body })
    kriteriaBaru.save()
        .then(kriteria => res.json(kriteria))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Schools instances
    Kriteria.find()
        .then(semuaKriteria => res.json(semuaKriteria))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve mine
router.route('/mine').get((req, res) => {
    Kriteria.find({ createdBy: req.user._id })
        .then(semuaKriteria => res.json(semuaKriteria))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve some
router.get("/:id", (req, res, next) => {
    Kriteria.findById(req.params.id)
        .then(kriteria => res.json(kriteria))
        .catch(err => next(err));
});

//delete
router.route('/delete/:id').delete((req, res) => {
    Kriteria.deleteOne({ _id: req.params.id })
        .then(success => res.json(`Sukses! Data kriteria telah dihapus.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    Kriteria.findByIdAndUpdate(req.params.id, req.body)
        .then(kriteria => res.json(`Sukses! Data kriteria ${kriteria.nama} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;