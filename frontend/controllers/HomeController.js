movieApp.controller('HomeController', function($scope, $http) {
    $http.get('data/movies.json').then(function(response) {
      $scope.movies = response.data;
    });
  });
  