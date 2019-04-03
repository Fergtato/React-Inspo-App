const Post = require('../models/Post.js');
const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    image: String,
    tags: { type: [String], index: true },
    aesthetic_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Aesthetic' }
});

module.exports = mongoose.model('Post', PostSchema);
