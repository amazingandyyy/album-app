'use strict';

var mongoose = require('mongoose');
var Album = require('./album');

var imageSchema = new mongoose.Schema({
    url: {
        type: String
    },
    createAt: {
        type: Date,
        data: new Date
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
});
imageSchema.statics.addToAlbum = function(params, cb) {
    var albumId = params.albumId;
    var imageId = params.imageId;
    // console.log('albumId: ', albumId);
    // console.log('imageId: ', imageId);
    new Promise((resolve, reject) => {
            this.findById(imageId, (err, image) => {
                if (err || !image) {
                    reject(err || 'image not found')
                } else {
                    if (image.albums.indexOf(albumId) === -1) {
                        image.albums.push(albumId);
                        image.save(err => {
                            if (err) reject(err);
                            resolve(image)
                        })
                    } else {
                        reject('albumId already exists');
                    }
                }
            })
        })
        .then(image => {
            // here is not promise there is no resolve or reject...
            Album.findById(albumId, (err, album) => {
                if (err) return cb(err);
                // console.log('album: ', album);
                // console.log('album.images: ', album.images);
                if (album.images.indexOf(imageId) === -1) {
                    album.images.push(imageId);
                    album.save(err => {
                        if (err) return cb(err);
                        cb(null, {
                            album,
                            image
                        })
                    })
                } else {
                    cb(err)
                }
            })
        })
        .catch(err => cb(err))
};

var Image = mongoose.model('Image', imageSchema);
module.exports = Image;
