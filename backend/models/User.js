const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        fotoProfil: {
            type: [Buffer]
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            type: String,
            default: 'admin-sekolah'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        lastActive: {
            type: Date
        },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
        logs: {
            type: Array,
            default: []
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    },
    {
        _id: false,
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User 