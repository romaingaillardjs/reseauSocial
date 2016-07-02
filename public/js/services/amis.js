angular.module('MyApp')
  .factory('Amis', function($http, $window) {
    return {
        listeAmisRequest: function(data) {
            return $window.localStorage.user.ami
     	}
    }
  });
