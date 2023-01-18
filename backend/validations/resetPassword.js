const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateResetPassword(data) {
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

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