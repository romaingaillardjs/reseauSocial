angular.module('MyApp')
  	.factory('Search', function($http) {
    	return {
      		searchRequest: function(data) {
        		  return $http.post('/search', data);
      		},
      		searchById: function(data) {
              return $http.post('/profil/:params', {id:data})
          }
      }
  	});
