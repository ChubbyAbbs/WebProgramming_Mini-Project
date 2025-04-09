var app = angular.module('movieApp', []);

app.controller('HomeController', function($scope) {
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
});

app.controller('SeatController', function($scope) {
  const rows = 5;
  const cols = 10;

  $scope.seats = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      selected: false,
      occupied: Math.random() < 0.2
    }))
  );

  $scope.toggleSeat = function(rowIndex, seatIndex) {
    const seat = $scope.seats[rowIndex][seatIndex];
    if (!seat.occupied) {
      seat.selected = !seat.selected;
    }
  };

  $scope.confirmSeats = function() {
    const selectedSeats = [];
    $scope.seats.forEach((row, rowIndex) => {
      row.forEach((seat, seatIndex) => {
        if (seat.selected) {
          selectedSeats.push(`Row ${rowIndex + 1}, Seat ${seatIndex + 1}`);
        }
      });
    });
    alert(`You selected: ${selectedSeats.join(', ')}`);
  };
});
