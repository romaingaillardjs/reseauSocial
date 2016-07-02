angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search) {
    $scope.user = $rootScope.userList;
});