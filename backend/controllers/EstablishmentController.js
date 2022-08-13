const Establishment = require('../models/Establishment')
const router = require('express').Router()

//create
router.route('/new').post((req, res) => {
    const newEstablishment = new Establishment(req.body)
    newEstablishment.save()
        .then(establishment => res.json(establishment))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Establishment instances
    Establishment.find()
        .then(allEstablishments => res.json(allEstablishments))
        .catch(err => res.status(400).json('Error! ' + err))
})

//delete
router.route('/delete/:id').delete((req, res) => {
    Establishment.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! Establishment deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    Establishment.findByIdAndUpdate(req.params.id, req.body)
        .then(establishment => res.json('Success! Establishment updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;