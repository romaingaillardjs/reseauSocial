angular.module('MyApp')
	.factory('Message', function($http, Search) {
  	return {
      postMessagePublics: function(user_id, message) {
        return $http.post('/postMessagePublics', {user_id : user_id,  message: message})
      },
      postMessagePrives: function(user_id, message) {
        return $http.post('/postMessagePrives', {user_id : user_id,  message: message})
      },
      getMessagesPublics: function(id) {
          return $http.post('/getMessagesPublics', {id:id})
      },
  		getMessagesPrives: function(id) {
    		  return $http.post('/getMessagesPrives', {id:id})
  		},
      listeAmis: function(data) {
          return Search.search_List_By_Id(data)
      },
      
    }  
	});