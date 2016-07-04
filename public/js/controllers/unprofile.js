angular.module('MyApp')
	.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Search, Amis) {
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
    
console.log($scope.userModel)
    

});