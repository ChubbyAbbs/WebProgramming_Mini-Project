angular.module('movieApp').controller('SeatController', function($scope, $location) {
  const movies = [
    { id: 1, title: "Avengers: Endgame" },
    { id: 2, title: "Inception" },
    { id: 3, title: "Interstellar" }
  ];

  const query = $location.absUrl().split('?')[1];
  const params = new URLSearchParams(query);
  const id = parseInt(params.get("movieId"));
  $scope.movie = movies.find(m => m.id === id);

  $scope.seats = Array.from({ length: 54 }, (_, i) => ({
    number: i + 1,
    selected: false,
    occupied: Math.random() < 0.2
  }));

  $scope.toggleSeat = function(seat) {
    if (!seat.occupied) {
      seat.selected = !seat.selected;
    }
  };

  $scope.confirmBooking = function() {
    const selectedSeats = $scope.seats.filter(seat => seat.selected);
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const bookingInfo = {
      movie: $scope.movie,
      seats: selectedSeats
    };

    localStorage.setItem("booking", JSON.stringify(bookingInfo));
    window.location.href = "summary.html";
  };
});
