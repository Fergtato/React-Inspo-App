const mongoose = require('mongoose');

const AestheticSchema = mongoose.Schema({
    title: String,
    image: String,
    date: String,
    description: String
});

module.exports = mongoose.model('Aesthetic', AestheticSchema);
