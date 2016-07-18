angular.module('MyApp')
.controller('HomeCtrl', function($scope, $rootScope) {
	$scope.user.nbUserConnected = $rootScope.nbUserConnected

})

