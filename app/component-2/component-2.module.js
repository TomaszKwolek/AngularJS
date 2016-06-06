angular.module('app.component2', ['ngRoute', 'ui.bootstrap', 'app.component2.templates'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/component-2/dialog-b', {
            templateUrl: 'component-2/dialog-b/dialog-b.html',
            controller: 'LibraryController',
            resolve: {
                response: function($http){
                    return $http.get('/component-2/books.json');
                }
            }
        });
    });
