const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 3600
        }
    },
    {
        _id: false,
        timestamps: true
    }
);

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token