'use strict';

var mongoose = require('mongoose');
var Image = require('./image');

var albumSchema = new mongoose.Schema({
    name: {
        type: String
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
});

albumSchema.statics.addPhoto = function(params, cb) {
    var albumId = params.albumId;
    var imageId = params.imageId;
    // console.log('albumId: ', albumId);
    // console.log('imageId: ', imageId);
    new Promise((resolve, reject) => {
            this.findById(albumId, (err, album) => {
                if (err || !album || !imageId) {
                    reject(err || 'album not found')
                } else {
                    if (album.images.indexOf(imageId) === -1) {
                        console.log('check1');
                        album.images.push(imageId);
                        album.save(err => {
                            if (err) reject(err);
                            resolve(album);
                        })
                    } else {
                        reject('imageId already exists');
                    }
                }
            })
        })
        .then(album => {
            console.log('check2');
            console.log('imageId after check2: ', imageId);
            // here is not promise there is no resolve or reject...
            Image.findOne({"_id": imageId}, (err, image) => {
                console.log('check3');
                console.log('imageimageimage: ', image);
                if (err) return cb(err);
                if (image.albums.indexOf(albumId) === -1) {
                    console.log('check4');
                    image.albums.push(albumId);
                    image.save(err => {
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

var Album = mongoose.model('Album', albumSchema);
module.exports = Album;
