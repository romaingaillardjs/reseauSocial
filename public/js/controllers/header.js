angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $rootScope, $location, $window, $auth, $http,$timeout, Search, Notifications) {

    $scope.user = $rootScope.currentUser
    
    $scope.nbmessages = 3;
    console.log($scope.user)

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
      Search.search_All_Ids().success(function (data) {
        $rootScope.items = data;
      });    
      return $rootScope.items;
    };  
    $scope.searchRequest();
    $scope.viewProfil = function(id) {
      return Search.search_By_Id(id).success(function (data) {
        console.log(data.user)
        $rootScope.unProfil = data.user;
          $location.path('/profil/'+data.user.name)
          $scope.blur()
      })
    };
    $scope.nbnotifications = function (data) {
     return Notifications.searchNbNotification(data).success(function () {
     })
    };
      //$scope.nbnotifications($scope.user)
  });
 

