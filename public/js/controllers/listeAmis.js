angular.module('MyApp')
  .controller('ListeAmisCtrl', function($rootScope, $scope, $window, $location, Amis) {
    $scope.user = $rootScope.currentUser;  
    $scope.get_friends_list = function (data) {
      Amis.get_friends_list(data)
        .success(function (data) {
          $scope.amis = data;      
        })
        .error(function (data) {
          console.log(data)
      });
      return $scope.amis
    };
    $scope.get_friends_list($scope.user.ami)
    
    $scope.viewProfil = function(id) {
      return Amis.viewProfil(id).success(function (data) {
        $rootScope.unProfil = data.user;
        $location.path('/profil/'+data.user.name)
      })
    }; 
})




    
