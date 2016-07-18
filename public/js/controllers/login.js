angular.module('MyApp')
  .controller('LoginCtrl', function($scope, $rootScope, $location, $window, $auth) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $window.localStorage.user = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse($window.localStorage.user);
          $rootScope.login = true;
          $location.path('/');
          var socket = io();
            socket.on('news', function (data) {
              console.log(data);
              $rootScope.nbUserConnected = data
            });
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
          var socket = io();
            socket.on('news', function (data) {
              console.log(data);
              $rootScope.nbUserConnected = data
            });
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  });