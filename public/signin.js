var Sign_in = angular.module('Sign_in', ['ngMaterial']);

Sign_in.controller('SigninController', function ($scope, $http, $mdDialog) {
$scope.formData = {};

// when submitting the add form, send the text to the node API
$scope.userSignin = function() {
    $http.post('/', $scope.formData)
        .success(function(data) {
            $scope.userdata = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
};


$scope.Signup_modal = function($mdDialog){
    $scope.showadvanced = function(ev){
        $mdDialog.show({
            controller: modal_controller,
            templateUrl: 'signup_modal.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            targetEvent: ev,
        });
    }
};
});
