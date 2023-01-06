const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegister(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (!Validator.isLength(data.name, { min: 2, max: 80 })) {
        errors.name = "Nama harus diantara 2-80 karakter";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Nama tidak boleh kosong";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email tidak boleh kosong";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email tidak valid atau email tidak boleh kosong";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password tidak boleh kosong";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password harus tersusun atas 6 - 30 karakter";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Konfirmasi password tidak boleh kosong";
    } else {
        if (!Validator.equals(data.password, data.password2)) {
            errors.password2 = "Konfirmasi password tidak sama dengan password";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};