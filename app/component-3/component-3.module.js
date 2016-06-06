angular.module('app.component3', ['ngRoute', 'app.component3.templates', 'app.component2'])
    .config(function($routeProvider) {
            'use strict';
            $routeProvider.when('/component-3/dialog-c', {
                    templateUrl: 'component-3/dialog-c/dialog-c.tpl.html',
                    controller: 'FilterController',
                    resolve: {
                      response: function($http){
                          return $http.get('/component-2/books.json');
                      }
                    }
                });
            });
