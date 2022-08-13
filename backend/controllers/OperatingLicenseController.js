const OperatingLicense = require('../models/OperatingLicense')
const router = require('express').Router()

//create
router.route('/new').post((req, res) => {
    const newOperatingLicense = new OperatingLicense(req.body)
    newOperatingLicense.save()
        .then(operatingLicense => res.json(operatingLicense))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Operating Licenses instances
    OperatingLicense.find()
        .then(allOperatingLicenses => res.json(allOperatingLicenses))
        .catch(err => res.status(400).json('Error! ' + err))
})

//delete
router.route('/delete/:id').delete((req, res) => {
    OperatingLicense.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! OperatingLicense deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    OperatingLicense.findByIdAndUpdate(req.params.id, req.body)
        .then(operatingLicense => res.json('Success! OperatingLicense updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;