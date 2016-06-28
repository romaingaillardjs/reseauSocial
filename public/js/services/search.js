angular.module('MyApp')
  	.factory('Search', function($http) {
    	return {
      		searchRequest: function(data) {
        		  return $http.post('/search', data);
      		},
      		searchById: function(data) {
              return $http.post('/searchById', {id:data})
              .then(function (data) {
                  return data;
            });
          }
      }
  	});
