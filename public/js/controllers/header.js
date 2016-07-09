angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $rootScope, $location, $window, $auth, $http, Search) {
    
    $scope.nbmessages = 3;
    
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.focus = function(){
 
    }
    
    $scope.blur = function(){
      $scope.search.name = '';
    }
    
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
        $scope.blur()
      })
    };
    $scope.nbnotifications = function (data) {
     return Search.searchNbNotification(data).success(function () {
     })
    };
    $scope.nbnotifications(angular.fromJson($window.localStorage.user).demande_d_ajout)
  });
 

