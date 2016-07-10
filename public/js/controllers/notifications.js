angular.module('MyApp')
  .controller('NotificationsCtrl', function($scope, $rootScope, $window, Search, Amis, Refresh) {
  	$scope.listeAmis = function (data) {
      Search.searchAmisById(data)
        .success(function (data) 
        {
          console.log(data)
          $scope.amis = data;         
        })
        .error(function (data) 
        {
        console.log(data) 
        });
      return $scope.amis
    };
    $scope.listeAmis($window.localStorage.user.demande_d_ajout)
    $scope.nbnotifications = function (data) {
     return Search.searchNbNotification(data).success(function () {
     })
    };
    
        $scope.confirmerAmi = function (id) {
        Amis.confirmerAmi(id)
        .success(function  (data) {
            console.log(data)
        })
        .error(function  (data) {
            console.log(data)
        })  
        Refresh.refresh(angular.fromJson($window.localStorage.user)._id)
          .then(function () {
            $scope.listeAmis(angular.fromJson($window.localStorage.user).demande_d_ajout) 
            
        });
        $scope.nbnotifications(angular.fromJson($window.localStorage.user).demande_d_ajout)       
        }; 

    })