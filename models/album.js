'use strict';

var mongoose = require('mongoose');
var Image = require('./image');

var albumSchema = new mongoose.Schema({
    name: {
        type: String
    },
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
});

albumSchema.statics.addPhoto = function(params, cb) {
    var albumId = params.albumId;
    var imageId = params.imageId;
    console.log('albumId: ', albumId);
    console.log('imageId: ', imageId);
    new Promise((resolve, reject) => {
            this.findById(albumId, (err, album) => {
                // console.log('errerr: ', err);
                // console.log('albumalbum: ', album);
                // console.log('!album: ', !album);
                if (err || !album) {
                    reject(err || 'not album found')
                } else {
                    album.photos.push(imageId);
                    album.save(err => {
                        if (err) reject(err);
                        resolve(album)
                    })
                }

            })
        })
        .then(album => {
            // here is not promise there is no resolve or reject...
            Image.findById(imageId, (err, image) => {
                if (err) return cb(err);
                image.albums.push(albumId);
                image.save(err => {
                    if (err) return cb(err);
                    cb(null, {
                        album,
                        image
                    })
                })
            })
        })
        .catch(err => cb(err))
};

var Album = mongoose.model('Album', albumSchema);
module.exports = Album;
