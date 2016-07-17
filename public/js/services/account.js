angular.module('MyApp')
  .factory('Account', function($http) {
    return {
      updateProfile: function(data) {
        return $http.put('/account', {data : data});
      },
      changePassword: function(data) {
        return $http.put('/changePassword', data);
      },
      deleteAccount: function() {
        return $http.delete('/account');
      },
      forgotPassword: function(data) {
        return $http.post('/forgot', data);
      },
      resetPassword: function(data) {
        return $http.post('/reset', data);
      }
    };
  });