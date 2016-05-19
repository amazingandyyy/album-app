var express = require('express');
var router = express.Router();

var Image = require('../models/image');

router.post('/', (req, res) => {
    // create one album with name and photos
    Image.create(req.body,(err, image) => {
            res.status(err ? 400 : 200).send(err || image)
        })
});
router.put('/:id', (req, res) => {
    // update one image's details
    Image.findByIdAndUpdate(req.params.id, req.body)
        .exec((err, image) => {
            res.status(err ? 400 : 200).send(err || image)
        })
});
router.get('/', (req, res) => {
    // get all images
    Image.find({})
        .populate('albums')
        .exec((err, images) => {
            res.status(err ? 400 : 200).send(err || images)
        })
});
router.get('/:id', (req, res) => {
    // get one image by id
    Image.findById(req.params.id)
        .populate('albums')
        .exec((err, image) => {
            res.status(err ? 400 : 200).send(err || image);
        })
});
router.delete('/:id', (req, res) => {
    // remove one image by id
    Image.findByIdAndRemove({'_id': req.params.id})
        .populate('albums')
        .exec((err) => {
            res.status(err ? 400 : 200).send(err);
        })
});

router.post('/:imageId/add/:albumId', (req, res) => {
    console.log('req.params', req.params);
    // create one album with name and photos
    Image.addToAlbum(req.params, (err, data) => {
            res.status(err ? 400 : 200).send(err || data)
        })
});

module.exports = router;
