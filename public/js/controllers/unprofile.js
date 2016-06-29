angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search) {
    $scope.user = $rootScope.user;
    console.log($scope.user)
  		// $scope.displayProfil = function () {
  		// 	return Search.searchById($routeParams.params)
  		// 	.success(function (data) {
  		// 		$scope.user = data;
  		// 	})
  		// 	.error(function (data) {
  		// 		console.log('erreur : ' + data);
    //     })
  		// };
    //   $scope.displayProfil();
});