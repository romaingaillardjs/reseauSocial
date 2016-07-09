angular.module('MyApp')
	.factory('Message', function($http) {
  	return {
      postMessagePublics: function(user_id, message) {
        return $http.post('/postMessagePublics', 
          {
            user_id : user_id, 
            message: message
          }
        );
      },
      postMessagePrives: function(user_id, message) {
        return $http.post('postMessagePrives', 
          {
            user_id : user_id, 
            message: message
          }
        );
      },
  		getMessagesPrives: function(id) {
    		  return $http.post('/getMessagesPrives', {id:id})
          .success(function (data) {
            console.log(data)
          })
          .error(function (data) {
            console.log(data)
          })
  		}
    }  
	});