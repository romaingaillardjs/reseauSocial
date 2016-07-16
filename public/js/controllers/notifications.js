angular.module('MyApp')
  .controller('NotificationsCtrl', function($scope, $rootScope, $window, $location,Search, Amis, Notifications, Recommandation) {

    $scope.user = $rootScope.currentUser

  	$scope.listeAmis = function (data) {
      Search.search_List_By_Id(data)
        .success(function (data) 
        {
          $scope.amis = data;         
        })
        .error(function (data) 
        {
        });
      return $scope.amis
    };
    $scope.listeAmis($scope.user.demande_d_ajout)

    $scope.getRecommandation = function (id) {
      Recommandation.getRecommandation(id)
        .success( function  (data) {
          console.log(data)
          $scope.recommandations = data
        }
      )
    }
    $scope.getRecommandation($scope.user._id)

    $scope.nbnotifications = function (data) {
     return Notifications.searchNbNotification(data)
        .success(function (data) { 
           if (data.length > 0) { 
              $rootScope.nbnotification = data.length
            }else{
              $rootScope.nbnotification = 0
            }
          })
        .error(function (data) {
          $rootScope.nbnotification = 0;
        }); 
      }
      $scope.nbnotifications($scope.user.demande_d_ajout)

 $scope.miseAjourProfil = function(id) {
      return Amis.viewProfil(id).success(function (data) {
        $window.localStorage.user = JSON.stringify(data);
        $rootScope.currentUser = JSON.parse($window.localStorage.user);
        $scope.nbnotifications($rootScope.currentUser.demande_d_ajout)
        $scope.listeAmis($rootScope.currentUser.demande_d_ajout)
      })
    }; 
  
    $scope.confirmerAmi = function (id) {
      Amis.confirmerAmi(id)
      .success(function  (data) {
         $scope.miseAjourProfil($scope.user._id)
      })
      .error(function  (data) {
      })
    }
      $scope.confirmerAmiRecomandation = function (id) {
      Recommandation.confirmerAmiRecomandation(id)
      .success(function  (data) {
         $scope.miseAjourProfil($scope.user._id)
      })
      .error(function  (data) {
      })
    }
    $scope.AnnulerDemande = function (id) {
      Amis.AnnulerDemandeAmi(id)
      .success(function  (data) {
         $scope.miseAjourProfil($scope.user._id)
      })
      .error(function  (data) {
      })
    };
    
})