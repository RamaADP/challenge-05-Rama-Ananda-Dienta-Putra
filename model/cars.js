const mongoose = require('mongoose');

const car = new mongoose.model('Car', {
    nama: {
        type: String,
        required: true,
    },
    biaya: {
        type: String,
        required: true,
    },
    ukuran: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    }
});

module.exports = car; 