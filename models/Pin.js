const mongoose = require('mongoose');

const pinSchema = mongoose.Schema({
    number: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Pin', pinSchema)