angular.module('app.component3').controller('FilterController', function($scope, $http, shareService, response) {
    'use strict';

    if (Object.keys(shareService.getBooks()).length === 0) {
        shareService.setBooks(response.data);
    }
    $scope.books = shareService.getBooks();

    $scope.selectedRow = null;
    $scope.selectedBook = {};
    $scope.genreFilter = "show all";

    $scope.setSelectedBook = function(index) {
        if ($scope.selectedRow === index) {
            $scope.selectedRow = null;
        } else {
            $scope.selectedRow = index;
            findGenre(index);
            $scope.selectedRow = null;
        }
    }

    var includeGenre = function(genreArray, genre) {
        var result = false;
        for (var j = 0; j < genreArray.length; j++) {
            if (genreArray[j] === genre) {
                result = true;
            }
            else{
            }
        }
        return result;
    }

    $scope.filterBook = function(book){
    return $scope.genreFilter === "show all" ||
            book.genre === $scope.genreFilter ;
      };

    $scope.genres = [];
    $scope.genres.push('show all');
    for (var i = 0; i < $scope.books.length; i++) {
            if (!includeGenre($scope.genres, $scope.books[i].genre)) {
                $scope.genres.push($scope.books[i].genre);
        }
    }



    //    var findGenre = function(index) {
    //        $scope.genreFilter=$scope.books[index].genre;
    //    };

});
