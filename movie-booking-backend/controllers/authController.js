angular.module('movieApp').controller('AuthController', function ($scope, $http, $window) {
  // Replace with your actual backend base URL
  const baseUrl = 'http://localhost:3000/api/auth';

  $scope.user = {};
  $scope.newUser = {};

  // Login Function
  $scope.login = function () {
    $http.post(`${baseUrl}/login`, $scope.user)
      .then(function (response) {
        alert(response.data.message);
        $window.localStorage.setItem('token', response.data.token); // store token
        $window.location.href = 'index.html'; // redirect to homepage
      })
      .catch(function (error) {
        alert(error.data.message || 'Login failed');
      });
  };

  // Register Function
  $scope.register = function () {
    $http.post(`${baseUrl}/register`, $scope.newUser)
      .then(function (response) {
        alert(response.data.message);
        $window.location.href = 'login.html'; // redirect to login page
      })
      .catch(function (error) {
        alert(error.data.message || 'Registration failed');
      });
  };
});
