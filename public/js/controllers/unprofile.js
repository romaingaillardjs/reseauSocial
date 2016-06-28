angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search) {
  		$scope.displayProfil = function () {
  			return Search.searchById($routeParams.params).then(function (data) {$scope.user = angular.fromJson(data)
  				console.log($scope.user)
  			})
  		};
  		$scope.displayProfil();
});