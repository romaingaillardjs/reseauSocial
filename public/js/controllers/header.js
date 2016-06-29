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
<<<<<<< HEAD
      return $http.get('/search')
              .success(function (data) {
                console.log(data)
                $scope.items = data;
              })
              .error(function (data) {
                console.log(data)
              })
=======
      return Search.searchRequest()
        .success(function(data) {
          return $scope.items = data;
        })
        .error(function (error) {
          return console.log(error);
        })
>>>>>>> 729ecbde26ef2d2fb9d2716784ff43c532705a06
    };  
    $scope.searchRequest();
    $scope.viewProfil = function(id) {
      console.log(id)
      $location.path('/profil/'+id)
    };   
  });
 

