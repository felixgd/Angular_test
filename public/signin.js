var Sign_in = angular.module('Sign_in', ['ngRoute']);

Sign_in.controller('SigninController', function ($scope, $http, $mdDialog) {
$scope.formData = {};

// when submitting the add form, send the text to the node API
$scope.userSignin = function() {
    $http.post('/login', $scope.formData)
        .success(function(data) {
            $scope.userdata = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
};


/*$scope.Signup_modal = function($mdDialog){
    
    $scope.showadvanced = function(ev){console.log('test');
        $mdDialog.show({
            controller: modal_controller,
            templateUrl: 'signup_modal.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            targetEvent: ev,
        });
    }
};*/

Sign_in.config(function($routeProvider){
    console.log('test');
    $routeProvider.when('#/sign_up', {
        templateUrl: 'signup_modal.html',
        controller: 'signupController'
    });
})

});
