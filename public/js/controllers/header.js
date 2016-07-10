angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $rootScope, $location, $window, $auth, $http,$timeout, Search) {
    
    $scope.nbmessages = 3;

    angular.element(document.querySelector('#navbar'))
    $scope.test = angular.element(document.querySelector('#navbar'));
    $scope.test.focusout(function () {
      $timeout(function (){ 
        $scope.test.removeClass("in");

      }, 100)  
    });
    
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.focus = function(){
 
    }
    
    $scope.blur = function(){
      $timeout(function ()
        { 
          $scope.test.removeClass("in");
           if ($scope.search) {$scope.search.name = ''};
          console.log('blur')
        }, 100)  
    }      
    $scope.collapsed = function(){
      $timeout(function ()
        { 
          $scope.test.removeClass("in");
          console.log('blur')
        }, 100)  
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
    if ($window.localStorage.user) {$scope.nbnotifications(angular.fromJson($window.localStorage.user).demande_d_ajout)};
  });
 

