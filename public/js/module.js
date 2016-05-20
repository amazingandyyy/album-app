'use strict';

var app = angular.module('albumApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('photos', {
            url: '/photos',
            templateUrl: '../html/photos.html',
            controller: 'photosCtrl'
        })
        .state('photo', {
            url: '/photo',
            templateUrl: '../html/photo.html',
            controller: 'photoCtrl'
        })
        .state('albums', {
            url: '/albums',
            templateUrl: '../html/albums.html',
            controller: 'albumsCtrl'
        })
        .state('album', {
            url: '/album',
            templateUrl: '../html/album.html',
            controller: 'albumCtrl'
        })

    $urlRouterProvider.otherwise('photos');
});
