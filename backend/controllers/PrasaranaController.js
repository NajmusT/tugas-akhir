const Prasarana = require('../models/Prasarana')
const router = require('express').Router()

const { v1: uuidv1 } = require('uuid');
const { protect } = require("../middlewares/authMiddlewares")

//create
router.route('/new').post((req, res) => {
    const prasaranaBaru = new Prasarana({ _id: uuidv1(), createdBy: req.user._id, ...req.body })
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
router.route('/update/:id').put((req, res) => {
    Prasarana.findByIdAndUpdate(req.params.id, req.body)
        .then(prasarana => res.json(`Sukses! Data prasarana ${prasarana.nama} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;