const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Aesthetic = require('./models/Aesthetic');
const Post = require('./models/Post');

const server = express();
const dbname = 'ReactCA2';

// serve files from the dist directory
server.use(express.static('dist'));


// const mongo_uri = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbname}`;
const mongo_uri = 'mongodb+srv://fergus:Aventador1995!@reactca2-hba6r.mongodb.net/ReactCA2?retryWrites=true';

let db;

mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
    if (err) {
        throw err;
    } else {
        console.log(`Successfully connected to ${mongo_uri}`);
    }
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


server.get('/api/aesthetics', (req, res) => {
    Aesthetic.find({}, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

server.get('/api/posts', (req, res) => {
    Post.find({}, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

server.get('/api/aesthetics/:id', (req, res) => {
    Aesthetic.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

server.get('/api/posts/:id', (req, res) => {
    Post.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) throw err;

        res.send(result);
    });
});

server.get('/api/aesthetics/:id/posts', (req, res) => {
    Aesthetic.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
        if (err) throw err;

        Post.find({aesthetic_id: result._id}, (err, posts) => {
            if (err) throw err;

            res.send(posts);
        });
    });
});

server.post('/api/posts', (req, res) => {
    const post = new Post(req.body);
    post.save((err, result) => {
        if (err) throw err;

        console.log('created in database');
        res.redirect('/');
    });
});

// delete post with specific ID from DB
server.delete('/api/posts', (req, res) => {
    console.log(req.body.id);
    Post.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
        if (err) return res.send(err);

        console.log('deleted from database');
        return res.send({ success: true });
    });
});

server.put('/api/posts', (req, res) => {
    const id = req.body._id;
    // remove the ID so as not to overwrite it when updating
    delete req.body._id;
    // find a post matching this ID and update its details
    Post.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
        if (err) throw err;

        console.log('updated in database');
        return res.send({ success: true });
    });
});

server.post('/api/aesthetics', (req, res) => {
    const aesthetic = new Aesthetic(req.body);
    aesthetic.save((err, result) => {
        if (err) throw err;

        console.log('created in database');
        res.redirect('/');
    });
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
