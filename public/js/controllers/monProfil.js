angular.module('MyApp')
.controller('MonProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams,$interval, Search, Amis, Message ) {
  $interval.cancel($rootScope.MajMessage)
  $interval.cancel($rootScope.stop)
  
  $scope.user = $rootScope.currentUser;;
  $scope.items = $rootScope.items;

    $scope.profile = $rootScope.currentUser;

    $scope.ajouterAmi = function  (user) {
        amiAjoute = user
        amiAjoutant = angular.fromJson($window.localStorage.user)

      Amis.AjouterAmi(amiAjoutant, amiAjoute)
      .success(function  (data) {
      })
      .error(function  (data) {
      })    
    };  
    $scope.userlist = $rootScope.items;
    $scope.recomanderAmi = function (idArecommande, idcible) {
        Amis.recomanderAmi(idArecommande, idcible)
        .success(function  (data) {
        })
        .error(function  (data) {
        })
        
    }; 
     $scope.envoyerMessagePublic = function (user_id, message) {
      Message.postMessagePublics(user_id, message)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.listeAmis = function (data) {
        Search.search_List_By_Id(data).success(function (data) {
        $scope.amis = data
            
      }).error(function (data) {
      });
        return $scope.amis
      };
    $scope.listeAmis($scope.user.ami)
        $scope.viewProfil = function(id) {
      return Search.search_By_Id(id).success(function (data) {
        $rootScope.unProfil = data;
        $location.path('/profil/'+data.name)
      })
    };

})