'use strict';

var expect = require('chai').expect;

const mongoose = require('mongoose');
var Image = require('../../models/image');
var Album = require('../../models/album');
const dbUrl = 'mongodb://localhost/album-app-test';
let imageId, albumId;

// add data to testDB first to test the relationship funtion
before(function(cb) {
    mongoose.connection.close(function() {
        mongoose.connect(dbUrl, cb);

        Album.create({
            name: "testAlbumName"
        }, (err, album) => {
            albumId = album._id
        })
        Image.create({
            url: "testAlbumName",
            title: "testAlbumTitle",
            description: "dd"
        }, (err, image) => {
            imageId = image._id
        })

    });
});

// test root/api/album/:albumId/add/:imageId
describe('Album', function() {
    describe('.addPhoto()', function() {
        it('should add a new photo to album and relate the album to the phto we just add.', function(done) {
            var params = {};
            params.albumId = albumId;
            params.imageId = imageId;
            Album.addPhoto(params, function(err, data) {
                expect(err).to.not.exist;
                expect(data).to.exist;
                done();
            })
        })
        it('should not add a new photo to album or relate the album to the phto we just add. - missing data', function(done) {
            var params = {};
            Album.addPhoto(params, function(err, data) {
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
