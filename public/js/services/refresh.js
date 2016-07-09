
angular.module('MyApp')
  .factory('Refresh', function($http,$rootScope,$window) {
    return {
      refresh: function(data) {
          return $http.post('/profil', {id:data})
          .success(function(response) {
            console.log(response)
          $rootScope.currentUser = response;
          $window.localStorage.user = JSON.stringify(response);
        }).error(function  (data) {
          console.log(data)
        })
      }
    }  
  });
