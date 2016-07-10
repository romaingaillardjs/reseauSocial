
angular.module('MyApp')
  .factory('Refresh', function($http,$rootScope,$window) {
    return {
      refresh: function(data) {
          return $http.post('/profil', {id:data})
          .success(function(response) {
            console.log(response)
          $window.localStorage.user = JSON.stringify(response.data.user);
          console.log($window.localStorage.user)
        }).error(function  (data) {
          console.log(data)
        })
      }
    }  
  });
