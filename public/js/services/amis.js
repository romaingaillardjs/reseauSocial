angular.module('MyApp')
  .factory('Amis', function($http, $window) {
    return {
        listeAmisRequest: function() {
        	data = angular.fromJson($window.localStorage.user);
        	console.log(data);
            return data
     	}
    }
  });
