const Sarana = require('../models/Sarana')
const router = require('express').Router()

const { v1: uuidv1 } = require('uuid');

//create
router.route('/new').post((req, res) => {
    const saranaBaru = new Sarana({ _id: uuidv1(), ...req.body })
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
router.route('/update/:id').put((req, res) => {
    Sarana.findByIdAndUpdate(req.params.id, req.body)
        .then(sarana => res.json(`Sukses! Data sarana ${sarana.nama} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;