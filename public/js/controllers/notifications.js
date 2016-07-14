angular.module('MyApp')
  .controller('NotificationsCtrl', function($scope, $rootScope, $window, $location,Search, Amis, Notifications, Recommandation) {

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

    $scope.getRecommandation = function (id) {
      Recommandation.getRecommandation(id)
        .success( function  (data) {
          console.log(data)
        }
      )
    }
    $scope.getRecommandation($scope.user._id)

    $scope.nbnotifications = function (data) {
     return Notifications.searchNbNotification(data)
        .success(function (data) { 
          console.log(data)
           if (data.length > 0) { 
              $rootScope.nbnotification = data.length
            }else{
              $rootScope.nbnotification = 0
            }
            console.log(data)    
          })
        .error(function (data) {
          $rootScope.nbnotification = 0;
        }); 
      }
      $scope.nbnotifications($scope.user.demande_d_ajout)

 $scope.miseAjourProfil = function(id) {
      return Amis.viewProfil(id).success(function (data) {
        console.log(data)
        console.log($scope.user)
        $window.localStorage.user = JSON.stringify(data);
        $rootScope.currentUser = JSON.parse($window.localStorage.user);
        $scope.nbnotifications($rootScope.currentUser.demande_d_ajout)
        $scope.listeAmis($rootScope.currentUser.demande_d_ajout)
      })
    }; 
  
    $scope.confirmerAmi = function (id) {
      Amis.confirmerAmi(id)
      .success(function  (data) {
          console.log(data)
         $scope.miseAjourProfil($scope.user._id)
      })
      .error(function  (data) {
          console.log(data)
      })
    }; 
})