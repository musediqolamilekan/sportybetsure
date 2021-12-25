const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

    phoneNumber: {
        _id: Number,
        type: String,
        required: true,
    },

    password: {
        _id: Number,
        type: String,
        required: true,
    },
    number: {
        _id: Number,
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Customer', CustomerSchema);