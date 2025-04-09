angular.module('movieApp').controller('TicketController', function($scope, $location, $window) {
  $scope.movies = [
    {
      id: 1,
      title: "Avengers: Endgame",
      description: "The epic finale to the Infinity Saga.",
      poster: "images/endgame.jpg"
    },
    {
      id: 2,
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology.",
      poster: "images/inception.jpg"
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A mind-bending sci-fi epic where a team of explorers travels through a wormhole in search of a new home for humanity.",
      poster: "images/interstellar.jpg"
    }
  ];

  // Get movieId from URL
  const query = $location.absUrl().split('?')[1];
  const params = new URLSearchParams(query);
  const id = parseInt(params.get("movieId"));

  // Find the movie with that id
  $scope.movie = $scope.movies.find(m => m.id === id);

  // Function to go to seat selection page
  $scope.goToSeatSelection = function() {
    $window.location.href = 'select_seats.html?movieId=' + $scope.movie.id;
  };
});
