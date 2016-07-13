angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $rootScope, $location, $window, $auth, $http,$timeout, Search, Notifications) {

    $scope.user = $rootScope.currentUser
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
        console.log(data)
        $rootScope.unProfil = data;
        console.log(angular.fromJson($rootScope.unProfil)._id)
        $window.localStorage.lastPrifilView = angular.fromJson($rootScope.unProfil)._id
        $location.path('/profil/' + data.name)
        $scope.blur()
      })
    };
    $scope.nbnotifications = function (data) {
      console.log(data)
     return Notifications.searchNbNotification(data)
        .success(function (data) { 
          console.log(data.nbnotification)
           if (data.nbnotification > 0) { 
              $rootScope.nbnotification = data.nbnotification
            }else{
              $rootScope.nbnotification = ''
            }
            console.log(data)    
          })
        .error(function (data) {
          $rootScope.nbnotification = '';
        });
      }

  $scope.nbMessages = function (id) {
    console.log(id)
       return Notifications.searchNbMessages(id)
          .success(function (data) { 
            console.log(data)
            nbmessage = data.nbmessage
             if (nbmessage > 0) { 
                $rootScope.nbmessage = nbmessage
              }else{
                $rootScope.nbmessage = ''
              }
              console.log(data)    
            })
          .error(function (data) {
            $rootScope.nbmessage = '';
        }); 
      
    }



    if ($rootScope.currentUser==undefined) {
      console.log('je suis la' + $window.localStorage.user.demande_d_ajout)
      console.log('je suis la' + $window.localStorage.user._id)
    if ($scope.user.demande_d_ajout.length > 0) {$scope.nbnotifications($window.localStorage.user.demande_d_ajout)}
    if ($scope.user._id) {$scope.nbMessages($window.localStorage.user._id)}

    }else{
      $scope.user = $rootScope.currentUser;
      if ($scope.user.demande_d_ajout.length > 0) {$scope.nbnotifications($scope.user.demande_d_ajout)};
      if ($scope.user._id) {$scope.nbMessages($scope.user._id)}
    }
 
    });
