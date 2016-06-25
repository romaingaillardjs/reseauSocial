angular.module('MyApp')
.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search) {
  $scope.userId = $routeParams.params;
  console.log($routeParams.params)
  Search.searchById($scope.userId)
  .then(function (data) {
  $scope.user = data;
  })
});