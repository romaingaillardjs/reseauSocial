angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $location, $window, $auth, $http,Search) {
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
      return $http.get('/search')
              .success(function (data) {
                console.log(data)
                $scope.items = data;
              })
              .error(function (data) {
                console.log(data)
              })
    };  
    $scope.searchRequest();
    $scope.viewProfil = function(id) {
      console.log(id)
      $location.path('/profil/'+id)
    };   
  });
 

