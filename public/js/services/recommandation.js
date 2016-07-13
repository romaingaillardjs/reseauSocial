
angular.module('MyApp')
	.factory('Recommandation', function($http, $rootScope) {
	  	return {
	  		getRecommandation: function(id) {
	          return $http.post('/getRecommandation', {id:id});          
	    	}
	    }
	});