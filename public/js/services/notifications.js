angular.module('MyApp')
	.factory('Notifications', function($http, $rootScope) {
	  	return {
	  		searchNbMessages: function(id) {
	          return $http.post('/searchNbMessages', {id:id});          
	    	},
	      	searchNbNotification: function(id) {
	          return $http.post('/searchNbNotification', {id:id});          
	    	}
	    }
	});