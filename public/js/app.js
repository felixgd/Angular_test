var app = angular.module('app', ['ngRoute']);

// when submitting the add form, send the text to the node API
app.config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        resolve: {
          logincheck: checkLoggedin
        }
      })
      .when('/verify', {
        templateUrl: 'views/verification.html',
        controller: 'VerifyCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      })
  });
  
  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    console.log('lol?')
    $http.get('/loggedin').success(function(user) {
      $rootScope.errorMessage = null;
      //User is Authenticated
      if (user !== '0') {
        $rootScope.currentUser = user;
        console.log(user);
        deferred.resolve();
      } else { //User is not Authenticated
        $rootScope.errorMessage = 'You need to log in.';
        deferred.reject();
        $location.url('/login');
      }
    });
    return deferred.promise;
  }

