angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search, Amis, Message) {
    $scope.ajouterAmis = true;
    console.log($rootScope.unProfil)
    
    $scope.items = $rootScope.items;

    $scope.ajouterAmi = function  (user) {
        amiAjoute = user
        amiAjoutant = angular.fromJson($window.localStorage.user)

    	Amis.AjouterAmi(amiAjoutant, amiAjoute)
    	.success(function  (data) {
    		console.log(data)
    	})
    	.error(function  (data) {
    		console.log(data)
    	})   	
    };  
    $scope.userlist = $rootScope.items;
    $scope.recomanderAmi = function (idArecommande, idcible) {
        Amis.recomanderAmi(idArecommande, idcible)
        .success(function  (data) {
            console.log(data)
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
        console.log(data)
      });
      }
        return $scope.amis
      };
    if ($scope.user) {$scope.listeAmis($scope.user.ami)}; 

    $scope.viewProfil = function(id) {
      console.log('je suis la'+id)
      return Search.search_By_Id(id)
      .success(function (data) {
        
         data = JSON.stringify(data)
         data = JSON.parse(data)
         console.log('je suis la'+ data)
        $rootScope.unProfil = data;
        
        $window.localStorage.lastPrifilView = $rootScope.unProfil._id
        $location.path('/profil/'+data.name)
      }).error(function  (data) {
        console.log(data)
      })
    };

    $scope.isFriends = function () {
      if ($scope.user.ami) 
      {
        for (var i = 0; i < $scope.user.ami.length; i++) 
        {
          if ($scope.user.ami[''+i+''].id == $rootScope.currentUser._id) 
          {
              $scope.ajouterAmis = false
          }
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