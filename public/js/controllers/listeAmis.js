angular.module('MyApp')
  .controller('ListeAmisCtrl',['$scope', '$timeout','$log','$q','$rootScope', '$sce','$sanitize','amis' function($scope, $timeout,$log,$q,$rootScope,$sce, $sanitize,amis) {
    $scope.listeAmis = function (data) {
      Amis.listeAmisRequest().success(function (data) {
            $scope.amis = data
          });    
          return $scope.amis;
      }
}])




    
