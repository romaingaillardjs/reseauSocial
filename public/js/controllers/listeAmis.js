angular.module('MyApp')
  .controller('ListeAmisCtrl',['$scope', '$timeout','$log','$q','$rootScope', '$sce','$sanitize','Amis' function($scope, $timeout,$log,$q,$rootScope,$sce, $sanitize,Amis) {
    $scope.listeAmis = function (data) {
      Amis.listeAmisRequest().success(function (data) {
            $scope.amis = data
          });    
          return $scope.amis;
      }
}])




    
