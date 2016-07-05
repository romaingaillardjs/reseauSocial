angular.module('MyApp')
  .controller('ListeAmisCtrl', function($rootScope, $scope, $window, $location, Search) {
    
    $scope.listeAmis = function (data) {
    	Search.searchAmisById(data).success(function (data) {
        console.log(data)
      }).error(function (data) {
        console.log(data)
      });
      $scope.amis = angular.fromJson($window.localStorage.user).ami
    	console.log($scope.amis)
          return $scope.amis 
      };

    $scope.listeAmis(angular.fromJson($window.localStorage.user).ami)
    $scope.viewProfil = function(id) {
      return Search.searchById(id).success(function (data) {
        $rootScope.userList = data;
        $location.path('/profil/'+data.name)
      })
    }; 
})




    
