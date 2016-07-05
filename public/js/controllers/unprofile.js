angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search, Amis, Contact) {
        
    $scope.user = $rootScope.userList;
    $scope.items = $rootScope.items;

    $scope.ajouterAmi = function  (id) {
    	Amis.AjouterAmi(id)
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
});