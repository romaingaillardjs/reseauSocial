angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search, Amis, Contact) {
        
    $scope.user = $rootScope.userList;
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
    $scope.confirmerAmi = function (id) {
        Amis.confirmerAmi(id)
        .success(function  (data) {
            console.log(data)
        })
        .error(function  (data) {
            console.log(data)
        })     
    }; 
     $scope.envoyerMessagePublic = function (user_id, message) {
      Contact.send(user_id, message)
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
        Search.searchAmisById(data).success(function (data) {
        $scope.amis = data
            
      }).error(function (data) {
        console.log(data)
      });
        return $scope.amis
      };
    $scope.listeAmis($scope.user.ami)
        $scope.viewProfil = function(id) {
      return Search.searchById(id).success(function (data) {
        $rootScope.userList = data;
        $location.path('/profil/'+data.name)
      })
    };
});