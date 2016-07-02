angular.module('MyApp')
  .factory('Amis', function($http, $window) {
    return {
        listeAmisRequest: function() {
            return angular.fromJson($window.localStorage.user) 
     	}
    }
  });
