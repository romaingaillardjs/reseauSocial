angular.module('MyApp')
  .controller('ListeAmisCtrl', function($scope, Amis) {
    $scope.listeAmis = function (data) {
    	console.log(data)
      Amis.listeAmisRequest().success(function (data) {
            $scope.amis = data;
          });    
          return $scope.amis;
      }
    $scope.listeAmis()
})




    
