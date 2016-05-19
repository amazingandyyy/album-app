var express = require('express');
var router = express.Router();

var Album = require('../models/album');

router.post('/', (req, res) => {
    // create one album with name and photos
    console.log('body:', req.body);
    Album.create(req.body, (err, album) => {
            res.status(err ? 400 : 200).send(err || album)
        });
});
router.put('/:id', (req, res) => {
    // update one album's name and photos
    Album.findByIdAndUpdate(req.params.id, req.body)
        .exec((err, album) => {
            res.status(err ? 400 : 200).send(err || album)
        });
});
router.get('/', (req, res) => {
    // get all albums
    Album.find({})
        .populate('photos')
        .exec((err, albums) => {
            res.status(err ? 400 : 200).send(err || albums)
        })
});
router.get('/:id', (req, res) => {
    // get one album by id
    Album.findById(req.params.id)
        .populate('photos')
        .exec((err, album) => {
            res.status(err ? 400 : 200).send(err || album);
        })
});
router.delete('/:id', (req, res) => {
    // remove one album by id
    Album.remove({'_id': req.params.id})
        .populate('photos')
        .exec((err) => {
            res.status(err ? 400 : 200).send(err);
        })
});

router.post('/:albumId/add/:photoId', (req, res) => {
    console.log('req.params', req.params);
    // create one album with name and photos
    Album.addPhoto(req.params, (err, data) => {
            res.status(err ? 400 : 200).send(err || data)
        })
});

module.exports = router;
