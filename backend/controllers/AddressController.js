const Address = require('../models/Address')
const router = require('express').Router()

//create
router.route('/new').post((req, res) => {
    const newAddress = new Address(req.body)
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

//delete
router.route('/delete/:id').delete((req, res) => {
    Address.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! Address deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    Address.findByIdAndUpdate(req.params.id, req.body)
        .then(address => res.json('Success! Address updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;