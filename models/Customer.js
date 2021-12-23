const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

    phoneNumber: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Customer', CustomerSchema);