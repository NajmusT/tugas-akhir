const Accreditation = require('../models/Accreditation')
const router = require('express').Router()

//create
router.route('/new').post((req, res) => {
    const newAccreditation = new Accreditation(req.body)
    newAccreditation.save()
        .then(accreditation => res.json(accreditation))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all accreditation instances
    Accreditation.find()
        .then(allAccreditations => res.json(allAccreditations))
        .catch(err => res.status(400).json('Error! ' + err))
})

//delete
router.route('/delete/:id').delete((req, res) => {
    Accreditation.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! Accreditation deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    Accreditation.findByIdAndUpdate(req.params.id, req.body)
        .then(accreditation => res.json('Success! Accreditation updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;