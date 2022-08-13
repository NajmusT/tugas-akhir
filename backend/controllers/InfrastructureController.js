const Infrastructure = require('../models/Infrastructure')
const router = require('express').Router()

//create
router.route('/new').post((req, res) => {
    const newInfrastructure = new Infrastructure(req.body)
    newInfrastructure.save()
        .then(infrastructure => res.json(infrastructure))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Infrastructure instances
    Infrastructure.find()
        .then(allInfrastructures => res.json(allInfrastructures))
        .catch(err => res.status(400).json('Error! ' + err))
})

//delete
router.route('/delete/:id').delete((req, res) => {
    Infrastructure.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! Infrastructure deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    Infrastructure.findByIdAndUpdate(req.params.id, req.body)
        .then(infrastructure => res.json('Success! Infrastructure updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;