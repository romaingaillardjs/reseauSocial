angular.module('MyApp')
            
.controller('ListeAmisCtrl',['$scope', '$timeout','$log','$q','$rootScope', '$sce','$sanitize', function($scope, $timeout,$log,$q,$rootScope,$sce, $sanitize) {
        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };

  




  $scope.activeButton = function(arg) {
    var test = document.getElementById('id'+arg).classList;
  if ( test[0] == "FAQclose" || test[1] == "FAQclose" )
  {
    $scope.locale = test.remove("FAQclose");
    $scope.locale = test.add("FAQopen");
  } else {
    $scope.locale = test.remove("FAQopen");
    $scope.locale = test.add("FAQclose");
  }  
  }  

}])




    
