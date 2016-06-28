angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search) {
  		$scope.displayProfil = function () {
  			return Search.searchById($routeParams.params)
  			.success(function (data, status) {
  				$scope.user = data;
  			})
  			.error(function (data, status) {
  				console.log('erreur')
  			})
  		};
  		$scope.displayProfil();
});