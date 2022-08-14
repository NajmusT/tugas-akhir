const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const passport = require("passport")
const router = require('express').Router()

//validitation
const validateRegister = require("../validations/register")
const validateLogin = require("../validations/login")

const { v1: uuidv1 } = require('uuid');

const SECRET_OR_KEY = process.env.SECRET_OR_KEY

//retrieve all
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => next(err));
});

//retrieve current
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    return res.json({
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

//retrieve multiple
router.get("/multiple", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    const ids = JSON.parse(req.query.ids);
    User.find({ _id: { $in: ids } })
        .then(users => res.json(users))
        .catch(err => next(err));
});

//retrieve one
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.find()
        .then(users => res.json(users.map(user => ({ _id: user._id, updatedAt: user.updatedAt }))))
        .catch(err => next(err));
});

//register
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegister(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = "Email already used"
                return res.status(400).json(errors)
            }

            const newUser = new User({
                _id: uuidv1(),
                avatar: req.body.avatar,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                roles: req.body.roles,
                isActive: req.body.isActive,
                logs: req.body.logs
            })

            bcrypt.genSalt(10, (err, salt) => {
                if (err) return next(err);
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return next(err)
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => res.status(400).json("Error! " + err))
                });
            });
        })
})

//login
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email })
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = "User not found";
                errors.message = "Email/password combination doesn't match!"
                return res.status(404).json(errors);
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Check if user account is active
                        if (!user.isActive) {
                            errors.isActive = "User is not active";
                            errors.message = "Your account has expired."
                            return res.status(401).json(errors);
                        }

                        // User Matched
                        const payload = {
                            _id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            roles: user.roles
                        };

                        // Sign Token
                        jwt.sign(
                            payload,
                            SECRET_OR_KEY,
                            {},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        errors.password = "Password incorrect";
                        errors.message = "Email/password combination doesn't match!"
                        return res.status(401).json(errors);
                    }
                });
        });
});

//delete
router.delete("/delete/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! User deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update
router.put("/update/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json(`Success! ${user} updated.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;