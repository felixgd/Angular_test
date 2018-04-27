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
    console.log('logging in');
    $scope.login = function(user) {
      $http.post('/login', user)
        .success(function(response) {
          console.log(response);
          $rootScope.currentUser = response;
          $location.url("/profile");
        });
    }
  });

  app.controller("VerifyCtrl", function($location, $scope, $http, $rootScope) {
    $scope.verify = function(user) {
      console.log('verifying');
      $http.post('/verify', user)
        .success(function(response) {
          $rootScope.currentUser = response;
          $location.url("/profile");
        });
    }
  });