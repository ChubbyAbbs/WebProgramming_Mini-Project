angular.module('movieApp').controller('SummaryController', function($scope) {
  const booking = JSON.parse(localStorage.getItem('booking'));

  if (!booking || !booking.movie || !booking.seats) {
    alert("No booking found. Redirecting to home.");
    window.location.href = "index.html";
    return;
  }

  $scope.movie = booking.movie;
  $scope.selectedSeats = booking.seats;
  $scope.total = $scope.selectedSeats.length * 200;

  $scope.payNow = function() {
    alert("✅ Payment Successful!\nEnjoy your movie! 🍿");
    localStorage.removeItem("booking");
    window.location.href = "index.html";
  };
});
