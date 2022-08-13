const School = require('../models/School')
const router = require('express').Router()

//create
router.route('/new').post((req, res) => {
    const newSchool = new School(req.body)
    newSchool.save()
        .then(school => res.json(school))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Schools instances
    School.find()
        .then(allSchools => res.json(allSchools))
        .catch(err => res.status(400).json('Error! ' + err))
})

//delete
router.route('/delete/:id').delete((req, res) => {
    School.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! School deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    School.findByIdAndUpdate(req.params.id, req.body)
        .then(school => res.json('Success! School updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;