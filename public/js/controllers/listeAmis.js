angular.module('MyApp')
.controller('ListeAmisCtrl', function($rootScope, $scope, $window, $location, $interval, Amis) {
$interval.cancel($rootScope.MajMessage)
$interval.cancel($rootScope.stop)

$scope.user = $rootScope.currentUser;  
 $scope.miseAjourProfil = function(id) {
    console.log(id)
  return Amis.viewProfil(id).success(function (data) {
    $window.localStorage.user = JSON.stringify(data);
    $rootScope.currentUser = JSON.parse($window.localStorage.user);
    console.log($rootScope.currentUser._id)
    id = {id: $rootScope.currentUser._id}
    $scope.get_friends_list($rootScope.currentUser.ami)
  })
}; 
$scope.get_friends_list = function (data) {
  console.log(data)
    return Amis.get_friends_list(data)
      .success(function (data) {
        $scope.amis = data;      
      })
      .error(function (data) {
    });
};
$scope.get_friends_list($scope.user.ami)
$scope.viewProfil = function(id) {
  console.log(id)
  Amis.viewProfil(id).success(function (data) {
    $rootScope.unProfil = data;
    $window.localStorage.lastPrifilView = angular.fromJson($rootScope.unProfil)._id
    $location.path('/profil/'+data.name)
  })
}; 
$scope.supprimerAmi = function(id) {
  return Amis.supprimerAmi(id,$scope.user._id)
    .success(function (data) {
      console.log(data)
      $scope.miseAjourProfil($scope.user._id)
    })
};
})




    
