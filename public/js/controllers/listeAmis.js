angular.module('MyApp')
  .controller('ListeAmisCtrl', function($rootScope, $scope, $window, $location, Search) {

      $scope.listeAmis = function (data) {
        console.log(angular.fromJson($window.localStorage.user).ami)
        Search.searchAmisById(data).success(function (data) {
        $scope.amis = data
            
      }).error(function (data) {
        console.log(data)
      });
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




    
