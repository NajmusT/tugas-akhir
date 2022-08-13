const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studyGroupSchema = new Schema(
    {
        _id: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        major: {
            type: String,
            required: true
        },
        schoolId: {
            type: String,
            required: true
        },
        amountOfStudents: {
            type: Number,
            required: true
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
)

const StudyGroup = mongoose.model('StudyGroup', studyGroupSchema)
module.exports = StudyGroup