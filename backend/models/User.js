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
        logs: {
            type: Array,
            default: []
        },
        createdBy: {
            type: String
        },
        updatedBy: {
            type: String
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
        timestamps: false
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User 