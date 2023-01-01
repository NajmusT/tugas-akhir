//models
const User = require('../models/User')

//depedencies
const express = require("express")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const passport = require("passport")
const router = require('express').Router()

//validation
const validateRegister = require("../validations/register")
const validateLogin = require("../validations/login")

const { v1: uuidv1 } = require('uuid');

require('../config/passport')(passport)

//key
const SECRET_OR_KEY = process.env.SECRET_OR_KEY

//retrieve all
router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => next(err));
});

//retrieve current
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        return res.json({
            _id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    }
);
//retrieve one
router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => next(err));
});

//register
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegister(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email telah digunakan"
            return res.status(400).json(errors)
        } else {
            const newUser = new User({
                _id: uuidv1(),
                fotoProfil: req.body.fotoProfil,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                roles: req.body.roles,
                isActive: req.body.isActive,
                lastActive: req.body.lastActive,
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
        }
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
    User.findOne({ email }).then(user => {
        // Check for user
        if (!user) {
            errors.email = "User tidak ditemukan!";
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Check if user account is active
                if (!user.isActive) {
                    errors.isActive = "Akun tidak aktif";
                    errors.message = "Akun tidak dapat digunakan karna sudah tidak aktif."
                    return res.status(401).json(errors);
                }

                // User Matched
                const payload = {
                    _id: user._id,
                    name: user.name,
                    fotoProfil: user.fotoProfil,
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
                return res.status(400).json({ password: "Password tidak sesuai" });
            }
        });
    });
});

//delete - TO DO : solve error "Unknown authentication strategy "jwt""
router.route("/delete/:id").delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(success => res.json('Sukses! Data user telah dihapus.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update - TO DO : solve error "Unknown authentication strategy "jwt""
router.route("/update/:id").put(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json(`Sukses! Data user ${user.name} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router;