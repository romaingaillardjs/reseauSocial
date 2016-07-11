angular.module('MyApp')
	.factory('Notifications', function($http, $rootScope, Search) {
	  	return {
	      	searchNbNotification: function(data) {
	          return Search.search_List_By_Id(data);          
	    	}
	    }
	});