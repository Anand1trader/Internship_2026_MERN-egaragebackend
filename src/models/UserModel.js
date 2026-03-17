const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    profilepic: { type: String, default:"" },
    status: {
        type: String,
        enum: ['active', 'inactive','deleted','blocked'],
        default: 'active'
    }
}, { timestamps: true })

module.exports = mongoose.model('users', UserSchema)