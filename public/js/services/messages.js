angular.module('MyApp')
	.factory('Message', function($http) {
  	return {
  		getMessagesPrives: function(id) {
    		  return $http.post('/getmessagePrives', {id:id})
          .success(function (data) {
            console.log(data)
          })
          .error(function (data) {
            console.log(data)
          })
  		}
    }  
	});