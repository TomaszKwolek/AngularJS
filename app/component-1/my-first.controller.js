angular.module('app.component1').controller('MyFirstController', function($scope, $http, $modal, books){
   'use strict';

$scope.addBook = function(){
     var modalInstance = $modal.open({
         templateUrl: '/component-1/modal-dialog/modal-dialog.tpl.html',
         controller: 'MyModalController',
         size: 'lg',
         resolve: {
            newBook: function(){
                 return;
             }
         }
       })
};

}).controller('MyModalController', function($scope, $modalInstance){
    'use strict';

})
