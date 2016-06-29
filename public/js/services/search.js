angular.module('MyApp')
  	.factory('Search', function($http) {
    	return {
      		searchRequest: function(data) {
        		  return $http.get('/search');
      		},
      		searchById: function(data) {
              return $http.post('/profil', {id:data})
          }
      }
  	});
