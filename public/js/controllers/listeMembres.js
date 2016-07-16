
angular.module('MyApp')
  .controller('ListeMembresCtrl', function($scope, Search, $rootScope, $interval) {
  	$interval.cancel($rootScope.MajMessage)
	$interval.cancel($rootScope.stop)
  	    $scope.searchRequest = function() {
      Search.search_All_Ids().success(function (data) {
        $rootScope.membres = data;
      });    
      return $rootScope.membres;
    };  
    $scope.searchRequest()
  })