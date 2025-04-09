movieApp.controller('AuthController', function($scope) {
    $scope.user = {};
    $scope.newUser = {};
  
    $scope.login = function() {
      alert(`Welcome, ${$scope.user.username}!`);
      window.location.href = 'index.html';
    };
  
    $scope.register = function() {
      alert(`Account created for ${$scope.newUser.username}!`);
      window.location.href = 'login.html';
    };
  });
  