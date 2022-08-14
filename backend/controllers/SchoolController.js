const School = require('../models/School')
const router = require('express').Router()

const { v1: uuidv1 } = require('uuid');

//create
router.route('/new').post((req, res) => {
    const newSchool = new School({ _id: uuidv1(), ...req.body })
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

//retrieve some
router.get("/:id", (req, res, next) => {
    School.findById(req.params.id)
        .then(school => res.json(school))
        .catch(err => next(err));
});

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