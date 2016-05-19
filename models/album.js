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
    var photoId = params.photoId;
    console.log('albumId: ', albumId);
    console.log('photoId: ', photoId);
    new Promise((resolve, reject)=>{
        this.findById(albumId, (err, album) => {
            if (err) return reject(err);
            album.photos.push(photoId);
            album.save(err => {
                if (err) return reject(err);
                resolve(album)
            })

        })
    })
    .then(album=>{
        Image.findById( photoId, (err, image) => {
            if (err) reject(err);
            image.albums.push(albumId);
            image.save( err=>{
                if (err) reject(err);
                cb(null, {album,image})
            })
        })
    })
    .catch(err => cb(cb))

};

var Album = mongoose.model('Album', albumSchema);
module.exports = Album;
