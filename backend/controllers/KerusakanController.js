const Kerusakan = require('../models/Kerusakan')
const router = require('express').Router()

const { v1: uuidv1 } = require('uuid');

//create
router.route('/new').post((req, res) => {
    const kerusakanBaru = new Kerusakan({ _id: uuidv1(), ...req.body })
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