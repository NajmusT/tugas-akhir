const Inventory = require('../models/Inventory')
const router = require('express').Router()

const { v1: uuidv1 } = require('uuid');

//create
router.route('/new').post((req, res) => {
    const newInventory = new Inventory({ _id: uuidv1(), ...req.body })
    newInventory.save()
        .then(inventory => res.json(inventory))
        .catch(err => res.status(400).json("Error! " + err))
})

//retrieve all
router.route('/').get((req, res) => {
    // using .find() without a parameter will match on all Inventories instances
    Inventory.find()
        .then(allInventories => res.json(allInventories))
        .catch(err => res.status(400).json('Error! ' + err))
})

//retrieve some
router.get("/:id", (req, res, next) => {
    Inventory.findById(req.params.id)
        .then(inventory => res.json(inventory))
        .catch(err => next(err));
});

//delete
router.route('/delete/:id').delete((req, res) => {
    Inventory.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! Inventory deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.route('/update/:id').put((req, res) => {
    Inventory.findByIdAndUpdate(req.params.id, req.body)
        .then(inventory => res.json('Success! Inventory updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;