angular.module('MyApp')
  .factory('Contact', function($http) {
    return {
      send: function(user_id, message) {
        return $http.post('/postMessagePublics', 
          {
            user_id : user_id, 
            message: message
          }
        );
      },
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
      }
      
    };
  });