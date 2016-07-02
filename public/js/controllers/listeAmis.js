angular.module('MyApp')
  .controller('ListeAmisCtrl', function($scope, Amis) {
    $scope.listeAmis = function () {
    	console.log(data)
      Amis.listeAmisRequest().success(function (data) {
            $scope.amis = data;
          });    
          return $scope.amis;
      }
    $scope.listeAmis()
})




    
