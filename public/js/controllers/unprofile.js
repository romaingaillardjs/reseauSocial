angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search, Amis, Message) {
    $scope.ajouterAmis = true;

    $scope.user = $rootScope.unProfil;

    $scope.searchRequest = function() {
      Search.search_All_Ids().success(function (data) {
        $scope.userlist = data
      });    
      return $rootScope.items;
    };
    $scope.searchRequest()

    $scope.ajouterAmi = function  (user) {
        amiAjoute = user
        amiAjoutant = angular.fromJson($window.localStorage.user)

    	Amis.AjouterAmi(amiAjoutant, amiAjoute)
    	.success(function  (data) {
    	})
    	.error(function  (data) {
    	})   	
    };  
    
    $scope.recomanderAmi = function (idArecommande, idcible, idArecommandeName, idcibleName) {
        Amis.recomanderAmi(idArecommande, idcible, idArecommandeName, idcibleName)
        .success(function  (data) {
        })
        .error(function  (data) {
            console.log(data)
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
      if(data){ Search.search_List_By_Id(data).success(function (data) {
        $scope.amis = data     
      }).error(function (data) {

      });
      }
        return $scope.amis
      };
    if ($scope.user) {$scope.listeAmis($scope.user.ami)}; 

    $scope.viewProfil = function(id) {
      return Search.search_By_Id(id)
      .success(function (data) {  
        $rootScope.unProfil = data
        $scope.user = $rootScope.unProfil;
        $window.localStorage.lastPrifilView = angular.fromJson($rootScope.unProfil)._id
        $location.path('/profil/'+data.name)
        $scope.isFriends()
      }).error(function  (data) {
      })
    };

    $scope.isFriends = function () {
        for (var i = 0; i < $scope.user.ami.length; i++) 
        {
          if ($scope.user.ami[''+i+''].id == $rootScope.currentUser._id) 
          {
              $scope.ajouterAmis = false
          }
        }
    };
    if ($scope.user) {$scope.isFriends()}


    if ($rootScope.unProfil==undefined) {
    $scope.viewProfil($rootScope.unProfilId)

    }else{
      $scope.user = $rootScope.unProfil;
    }
});