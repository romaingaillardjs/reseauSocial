angular.module('MyApp')
  .controller('ListeAmisCtrl', function($scope, Amis) {
    $scope.listeAmis = function () {	
      Amis.listeAmisRequest().success(function (data) {
      	console.log(data)
            $scope.amis = data;
          });    
          return $scope.amis;
      }
    $scope.listeAmis()
})




    
