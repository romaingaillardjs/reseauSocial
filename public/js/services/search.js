angular.module('MyApp')
  	.factory('Search', function($http, $scope) {
    	return {
      		searchRequest: function(data) {
        		  return $http.get('/search')
              .success(function (data) {
                console.log(data)
                $scope.items = data;
              })
              .error(function (data) {
                console.log(data)
              })
      		},
      		searchById: function(data) {
              return $http.post('/profil', {id:data})
              .success(function (data) {
                console.log(data)
              })
              .error(function (data) {
                console.log(data)
              })
          }
      }
  	});
    


