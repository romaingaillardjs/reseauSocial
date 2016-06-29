angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search) {
  		$scope.displayProfil = function () {
  			return Search.searchById($routeParams.params)
<<<<<<< HEAD
  			.success(function (data) {
  				$scope.user = data;
  			})
  			.error(function (data) {
  				console.log('erreur : ' + data);
=======
  			.success(function (data, status) {
  				$scope.user = data;
  			})
  			.error(function (data, status) {
  				console.log('erreur')
>>>>>>> 729ecbde26ef2d2fb9d2716784ff43c532705a06
  			})
  		};
      $scope.displayProfil();
});