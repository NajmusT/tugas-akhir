//models
const User = require('../models/User')

//depedencies
const express = require("express")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const passport = require("passport")
const router = require('express').Router()
const nodemailer = require('nodemailer')
const crypto = require("crypto")
const moment = require("moment")

const path = require("path")
const fs = require("fs")

//validation
const validateRegister = require("../validations/register")
const validateLogin = require("../validations/login")

const { v1: uuidv1 } = require('uuid');
const { protect } = require("../middlewares/authMiddlewares")

require('../config/passport')(passport)

//key
const SECRET_OR_KEY = process.env.SECRET_OR_KEY

const generateToken = (id) => {
    return jwt.sign({ id }, SECRET_OR_KEY, {
        expiresIn: '30d',
    })
}

//retrieve all
router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => next(err));
});

//retrieve current
router.route("/current").get((req, res) => {
    User.findById(req.user)
        .then(user => res.json({
            id: req.user._id,
            nama: req.user.nama,
            fotoProfil: req.user.fotoProfil,
            email: req.user.email
        }))
});

//retrieve one
router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => next(err));
});

//register
router.post("/register", (req, res, next) => {
    const { errors, isValid } = validateRegister(req.body)

    if (!isValid) { return res.status(400).json({ errors: errors }) }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email telah digunakan"
            return res.status(400).json({ errors: errors })
        } else {
            const file = req.files === null ? null : req.files.file
            const ext = file != null ? path.extname(file.name) : ''
            const fileName = file != null ? (file.md5 + ext) : ''
            const url = `${req.protocol}`
            const allowedType = ['.png', '.jpg', '.jpeg'];

            const newUser = new User({
                _id: uuidv1(),
                fotoProfil: {
                    url: url,
                    fileName: fileName
                },
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                roles: req.body.roles,
                isActive: req.body.isActive,
                createdAt: req.body.createdAt,
                lastActive: req.body.lastActive,
                logs: req.body.logs,
            })

            if (file != null) {
                if (allowedType.includes(ext.toLowerCase())) {
                    file.mv(`./public/images/${fileName}`, async (err) => {
                        if (err) return res.status(500).json({ msg: err.message });
                    })
                } else {
                    return res.status(400).json("Tipe file tidak valid")
                }
            }

            bcrypt.genSalt(10, (err, salt) => {
                if (err) return next(err);
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return next(err)

                    newUser.password = hash
                    newUser.save()
                        .then(user => res.status(200).json("Register berhasil. Tunggu konfirmasi aktivasi melalui email"))
                        .catch(err => res.status(400).json({ err }))
                });
            });
        }
    })
})

//login
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);

    // Check Validation
    if (!isValid) { return res.status(400).json(errors); }

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
                    roles: user.roles,
                    lastActive: moment(),
                    token: generateToken(user._id)
                };

                return res.json({ payload, token: generateToken(user._id) });
            } else { return res.status(400).json({ password: "Password tidak sesuai" }); }
        });
    });
});

//delete - TO DO : solve error "Unknown authentication strategy "jwt""
router.route("/delete/:id").delete((req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(success => res.json('Sukses! Data user telah dihapus.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

//update - TO DO : solve error "Unknown authentication strategy "jwt""
router.route("/update/:id").put((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json(`Sukses! Data user ${user.name} telah terupdate.`))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/forget-password').post((req, res) => {
    if (req.body.email === '') {
        return res.status(400).send('Email diperlukan')
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (user === null) {
            res.status(403).send("Email tidak terdaftar didalam sistem")
        } else {
            if (user.isActive === false) {
                res.status(400).send("Akun belum diaktifkan")
            } else {
                const token = crypto.randomBytes(20).toString('hex');
                user.update({
                    ...user,
                    resetPasswordToken: token,
                    resetPasswordExpires: Date.now() + 3600000
                })

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_ADDRESS,
                        pass: process.env.EMAIL_PASSWORD
                    }
                })

                const mailOptions = {
                    from: process.env.EMAIL_ADDRESS,
                    to: user.email,
                    subject: 'Link untuk Reset Password',
                    text: `Anda menerima email ini karena anda ataupun orang lain mengajukan reset password untuk akun anda\n\nTolong click link dibawah ini untuk mengubah password anda.\n\nhttp://localhost:3000/reset-password/${token}\n\nJika anda tidak mengajukan reset password, abaikan pesan ini agar password tidak berubah\n`
                }

                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.error('Error: ', err)
                    } else {
                        return res.status(200).json('Email telah terkirim')
                    }
                })
            }
        }
    })
})

router.get('/reset', (req, res, next) => {
    User.findOne({
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: { [Op.gt]: Date.now() }
    }).then(user => {
        if (user === null) {
            return res.json('Link reset password telah expired. Harap kirim ulang')
        } else {
            const payload = {
                email: req.user.email
            }
            return res.json({ payload })
        }
    })
})

router.put('/updatePassword', (req, res, next) => {
    User.findOne({ email: req.body.email, resetPasswordToken: req.body.resetPasswordToken, resetPasswordExpires: { [Op.gt]: Date.now() } }).then(user => {
        if (user != null) {
            bcrypt.hash(req.body.password, 10).then(hashedPassword => {
                user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null })
            })
                .then(() => {
                    return res.status(200).send({ message: 'Password telah terupdate' })
                })
        } else {
            return res.status(404).json("User tidak terdaftar didalam sistem")
        }
    })
})

router.post('/sendKonfirmasi', (req, res, next) => {
    const email = req.body.email
    const message = req.body.message

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Konfirmasi Data Pendaftaran Akun',
        text: message
    }

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('Error: ', err)
        } else {
            return res.status(200).json('Email telah terkirim')
        }
    })
})

module.exports = router;