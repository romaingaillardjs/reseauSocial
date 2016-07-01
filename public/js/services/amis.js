angular.module('MyApp')
  .factory('Amis', function($http) {
    return {
        listeAmisRequest: function(data) {
            return $http.get('/listeAmis')
            .success(function (data) {
              console.log(data)
            })
            .error(function (data) {
              console.log(data)
            })
        }
    }
  });
