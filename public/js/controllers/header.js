angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $rootScope, $location, $window, $auth, $http,Search) {
    
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/');
    };
    $scope.searchRequest = function() {
      Search.searchRequest().success(function (data) {
        $rootScope.items = data;
      });    
      return $rootScope.items;
    };  
    $scope.searchRequest();
    $scope.viewProfil = function(id) {
      return Search.searchById(id).success(function (data) {
        $rootScope.userList = data;
        $location.path('/profil/'+data.name)
      })
    };   
  });
 

