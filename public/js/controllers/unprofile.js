angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search) {
  		Search.searchById($routeParams.params)
  		.then(function (data) {
  			console.log(data)
  		$scope.user = data;
  	})
});