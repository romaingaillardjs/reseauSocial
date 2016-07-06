angular.module('MyApp')
  .controller('ListeAmisCtrl', function($rootScope, $scope, $window, $location, Search) {
    
    $scope.listeAmis = function () {
      $scope.amis = angular.fromJson($window.localStorage.user).ami
    	console.log($scope.amis)
          return $scope.amis 
      };
    $scope.listeAmis()
    
    $scope.viewProfil = function(id) {
      return Search.searchById(id).success(function (data) {
        $rootScope.userList = data;
        $location.path('/profil/'+data.name)
      })
    }; 
})




    
