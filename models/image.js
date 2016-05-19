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


var Image = mongoose.model('Image', imageSchema);
module.exports = Image;
