angular.module('MyApp')
.controller('MonProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams,$interval, Search, Amis, Message, Account ) {
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
          $scope.majProfil()
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
$scope.repondreMessagePublic = function (user_id, message, name) {
  Message.repondreMessagePublics(user_id, message, name)
  .success(function(response) {
    $scope.messages = {
    success: [response.data]
    };
    $scope.majProfil()
    console.log('je suis la')
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
    $scope.updateProfile = function() {
      console.log($scope.profile)
      Account.updateProfile($scope.profile)
        .then(function(response) {
          console.log(response)
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
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
    $scope.listeAmis($scope.user.ami)

        $scope.viewProfil = function(id) {
      return Search.search_By_Id(id).success(function (data) {
        $rootScope.unProfil = data;
        $location.path('/profil/'+data.name)
      })
    };

    $scope.voirAmisMessages = function (id,name) {
  Message.getMessagesPublics(id)
    .success(function (data) {
      console.log(data)
      $scope.messagePublicsRecus = data; 
    })
};
$scope.supprimerMessage = function (id) {
  Message.supprimerMessage(id)
  .success(function (argument) {
    $scope.majProfil()
  })
}
$scope.viewProfil = function(id) {
  return Search.search_By_Id(id)
  .success(function (data) {  
    $rootScope.unProfil = data
    $scope.user = $rootScope.unProfil;
    $window.localStorage.lastPrifilView = angular.fromJson($rootScope.unProfil)._id

  }).error(function  (data) {
  })
};

$scope.majProfil = function () {
    $scope.viewProfil($scope.user._id)
    $scope.voirAmisMessages($scope.user._id,name)
  }
$scope.majProfil()

})