'use strict';

var expect = require('chai').expect;

const mongoose = require('mongoose');
var Image = require('../../models/image');
var Album = require('../../models/album');
const dbUrl = 'mongodb://localhost/album-app-test';
let imageId, albumId;

// test root/api/image/:imageId/add/:albumId
before(function(cb) {
    mongoose.connection.close(function() {
        mongoose.connect(dbUrl, function(err) {
            if(err) return cb(err);
            Album.create({
                name: "testAlbumName"
            }, (err, album) => {
                if(err) return cb(err);
                albumId = album._id;
                Image.create({
                    url: "testAlbumName",
                    title: "testAlbumTitle",
                    description: "dd"
                }, (err, image) => {
                    if(err) return cb(err);
                    // console.log('image: - test', image);
                    imageId = image._id;
                    cb()
                });
            })
        });
    });
});





describe('Image', function() {
    describe('.addToAlbum()', function() {
        it('should add a new album to photo and relate the album to the photo we just added.', function(done) {
            var params = {};
            // console.log('albumId: ', albumId);
            // console.log('imageId: ', imageId);
            params.albumId = albumId;
            params.imageId = imageId;
            console.log('params: ', params);
            Image.addToAlbum(params, function(err, data) {
                // console.log('err2222: ', err);
                // console.log('data22222: ', data);
                expect(err).to.not.exist;
                expect(data).to.exist;
                done();
            })
        })
        it('should not add a new photo to album or relate the album to the photo we just added. - missing data', function(done) {
            var params = {};
            Image.addToAlbum(params, function(err, data) {
                expect(err).to.exist;
                expect(data).to.not.exist;
                done();
            })
        })
    })

});



after(function(cb) {
    mongoose.connection.close(cb);
});
