'use strict';

var mongoose = require('mongoose');

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
    console.log('imageId2: ', imageId);
    new Promise((resolve, reject) => {
            this.findById(imageId, (err, image) => {
                // console.log('image: ', image);
                if (err || !image) {
                    // console.log('hi2 - err');
                    reject(err || 'image not found')
                } else {
                    console.log('image: ', image);
                    if (image.albums.indexOf(albumId) === -1) {
                        // console.log('yopppooo');

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
            // console.log('yopppooo');
            // here is not promise there is no resolve or reject...
            mongoose.model("Album").findById(albumId, (err, album) => {
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
        .catch(err => {
            // console.log('hi3');
            cb(err)
        })
};

var Image = mongoose.model('Image', imageSchema);
module.exports = Image;
