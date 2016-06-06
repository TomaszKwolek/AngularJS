angular.module('app.component2').controller('LibraryController', function($scope, $http, $modal, response, shareService) {
    'use strict';


    if (Object.keys(shareService.getBooks()).length === 0) {
        shareService.setBooks(response.data);
    }
    $scope.books = shareService.getBooks();

    $scope.selectedRow = null;
    $scope.selectedBook = {};

    $scope.addBook = function() {
        var modalInstance = $modal.open({
            templateUrl: '/component-2/modal-dialog/modal-dialog.tpl.html',
            controller: 'AddBookController',

        })
        modalInstance.result.then(function(addedBook) {
            $scope.books.push(addedBook);
            shareService.setBooks($scope.books);
        })
    };

    var getBookToEdit = function(index) {
        angular.copy($scope.books[index], $scope.selectedBook);
    };

    $scope.setSelectedBook = function(index) {
        if ($scope.selectedRow === index) {
            $scope.selectedRow = null;
        } else {
            $scope.selectedRow = index;
            getBookToEdit(index);
        }
    }

    $scope.editBook = function(selectedBook) {
        var modalInstance = $modal.open({
            templateUrl: '/component-2/modal-dialog/modal-dialog2.tpl.html',
            controller: 'EditBookController',
            resolve: {
                selectedBook: function() {
                    return $scope.selectedBook;
                }
            }
        })
        modalInstance.result.then(function(editedBook) {
            $scope.books[$scope.selectedRow] = editedBook;
            shareService.setBooks($scope.books);
        })
    };

    $scope.removeBook = function(index) {
        $scope.books.splice(index, 1);
        $scope.selectedRow = null;
    };

}).controller('AddBookController', function($scope, $modalInstance, shareService, dateService) {
    'use strict';

    $scope.years = dateService.getYearsTable();

    var findNextId = function() {
        var nextId = 0;
        var books = shareService.getBooks();
        for (var i = 0; i < books.length; i++) {
            var id = parseInt(books[i].id);
            if (id >= nextId) {
                nextId = id + 1;
            }
        }
        return nextId;
    }

    $scope.addedBook = {
        "id": findNextId(),
        "genre": '',
        "year": '',
        "title": '',
        "author": ''
    };

    $scope.confirm = function() {
        $modalInstance.close($scope.addedBook);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss();
    };


}).controller('EditBookController', function($scope, $modalInstance, selectedBook, dateService) {
    'use strict';

    $scope.years = dateService.getYearsTable();

    $scope.editedBook = {};

    angular.copy(selectedBook, $scope.editedBook);

    $scope.confirm = function() {
        $modalInstance.close($scope.editedBook);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss();
    };


}).service('shareService', function() {

    var booksAll = {};
    this.setBooks = function(books) {
        booksAll = books;
    }

    this.getBooks = function() {
        return booksAll;
    }

}).service('dateService', function() {

    var years = [];
    var startDate = 1900;
    var stopDate = 2100
    for (var i = startDate; i < stopDate; i++) {
        years.push(i);
    }

    this.getYearsTable = function() {
            return years;
    }

});
