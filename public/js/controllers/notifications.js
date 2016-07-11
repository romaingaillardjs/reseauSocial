angular.module('MyApp')
  .controller('NotificationsCtrl', function($scope, $rootScope, $window, Search, Amis, Notifications) {

    $scope.user = $rootScope.currentUser
    console.log($scope.user)
  	$scope.listeAmis = function (data) {
      Search.search_List_By_Id(data)
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
    console.log($scope.user)
    $scope.listeAmis($scope.user.demande_d_ajout)

    $scope.nbnotifications = function (data) {
     return Notifications.searchNbNotification(data)
        .success(function (data) { 
           if (data.length > 0) { 
              $rootScope.nbnotification = data.length
            }else{
              $rootScope.nbnotification = ''
            }
            console.log(data)    
          })
        .error(function (data) {
          $rootScope.nbnotification = '';
        }); 
      }

    
    $scope.confirmerAmi = function (id) {
      Amis.confirmerAmi(id)
      .success(function  (data) {
          console.log(data)
      })
      .error(function  (data) {
          console.log(data)
      })
    }; 
})