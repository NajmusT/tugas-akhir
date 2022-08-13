const StudyGroup = require('../models/StudyGroup')
const router = require('express').Router()

//create
router.route('/new').post((req, res) => {
    const newStudyGroup = new StudyGroup(req.body)
    newStudyGroup.save()
        .then(studyGroup => res.json(studyGroup))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all StudyGroups instances
    StudyGroup.find()
        .then(allStudyGroups => res.json(allStudyGroups))
        .catch(err => res.status(400).json('Error! ' + err))
})

//delete
router.route('/delete/:id').delete((req, res) => {
    StudyGroup.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! StudyGroup deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    StudyGroup.findByIdAndUpdate(req.params.id, req.body)
        .then(studyGroup => res.json('Success! StudyGroup updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;