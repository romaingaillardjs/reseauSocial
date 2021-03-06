angular.module('MyApp')
	.factory('Message', function($http, Search) {
  	return {
      postMessagePublics: function(user, message) {
        return $http.post('/postMessagePublics', {user : user,  message: message})
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
      countNoViewMessage: function(id) {
          return $http.post('/countNoViewMessage', {id:id})
      },
      repondreMessagePublics: function(user_id, message, name) {
        return $http.post('/repondreMessagePublics', {user_id : user_id,  message: message, name: name})
      },
      supprimerMessage: function (id) {
        return $http.post('/supprimerMessage', {id: id})
      }
    }  
	});