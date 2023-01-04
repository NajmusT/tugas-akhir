const Alamat = require('../models/Alamat')
const router = require('express').Router()

const { v1: uuidv1 } = require('uuid');
const { protect } = require("../middlewares/authMiddlewares")

//create
router.route('/new').post(protect, (req, res) => {
    const alamatBaru = new Alamat({ _id: uuidv1(), ...req.body })
    alamatBaru.save()
        .then(Alamat => res.json(Alamat))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get(protect, (req, res) => {
    // using .find() without a parameter will match on all Alamat instances
    Alamat.find()
        .then(semuaAlamat => res.json(semuaAlamat))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve some
router.get("/:id", protect, (req, res, next) => {
    Alamat.findById(req.params.id)
        .then(entity => res.json(entity))
        .catch(err => next(err));
});

//delete
router.route('/delete/:id').delete(protect, (req, res) => {
    Alamat.deleteOne({ _id: req.params.id })
        .then(success => res.json('Sukses! Data alamat telah dihapus.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put(protect, (req, res) => {
    Alamat.findByIdAndUpdate(req.params.id, req.body)
        .then(Alamat => res.json('Sukses! Data alamat telah terupdate.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;