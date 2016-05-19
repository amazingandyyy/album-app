'use strict';

var expect = require('chai').expect;

const mongoose = require('mongoose');
var Image = require('../../models/image');
var Album = require('../../models/album');
const dbUrl = 'mongodb://localhost/album-app-test';
let imageId, albumId;

// test root/api/album/:albumId/add/:imageId
describe('Image', function() {
    describe('.addToAlbum()', function() {
        it('should add a new album to photo and relate the album to the photo we just added.', function(done) {
            var params = {};
            params.albumId = albumId;
            params.imageId = imageId;
            Image.addToAlbum(params, function(err, data) {
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
