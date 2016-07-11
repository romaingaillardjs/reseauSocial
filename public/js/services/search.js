angular.module('MyApp')
	.factory('Search', function($http, $rootScope) {
  	return {
  		search_All_Ids: function() {
    		  return $http.get('/search')
  		},
  		search_By_Id: function(data) {
          return $http.post('/profil', {id:data})
      },
      search_List_By_Id: function(data) {
          return $http.post('/AmisById', {idList:data})
      }
    }
	});
    


