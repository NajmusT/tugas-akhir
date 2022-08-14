const Address = require('../models/Address')
const router = require('express').Router()

const { v1: uuidv1 } = require('uuid');

//create
router.route('/new').post((req, res) => {
    const newAddress = new Address({ _id: uuidv1(), ...req.body })
    newAddress.save()
        .then(address => res.json(address))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all address instances
    Address.find()
        .then(allAddresses => res.json(allAddresses))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve some
router.get("/:postalCode", (req, res, next) => {
    Address.findById(req.params.postalCode)
        .then(entity => res.json(entity))
        .catch(err => next(err));
});

//delete
router.route('/delete/:postalCode').delete((req, res) => {
    Address.deleteOne({ postalCode: req.params.postalCode })
        .then(success => res.json('Success! Address deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:postalCode').put((req, res) => {
    Address.findByIdAndUpdate(req.params.postalCode, req.body)
        .then(address => res.json('Success! Address updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;