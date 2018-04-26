app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {
    $scope.logout = function() {
      $http.post("/logout")
        .success(function() {
          $rootScope.currentUser = null;
          $location.url("/home");
        });
    }
  });
  
  app.controller("SignUpCtrl", function($scope, $http, $rootScope, $location) {
    $scope.signup = function(user) {
      if (user.password == user.password2) {
        $http.post('/signup', user)
        .success(function(data) {
            $scope.userdata = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
});
      }
    }
  });
  
  app.controller("LoginCtrl", function($location, $scope, $http, $rootScope) {
    $scope.login = function(user) {
      console.log('assdgf');
      $http.post('/login', user)
        .success(function(response) {
          $rootScope.currentUser = response;
          $location.url("/profile");
        });
    }
  });