angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $location, $window, $auth, Search) {
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
      return Search.searchRequest()
        .then(function(response) {
          console.log(response)
          $scope.items = angular.fromJson(response.data)
                
        })
    };  
    $scope.searchRequest();
  });
 

