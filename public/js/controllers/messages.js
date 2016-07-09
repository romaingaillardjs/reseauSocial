angular.module('MyApp')
  .controller('MessagesCtrl', function($scope, $rootScope, $window, Contact, Search, Message) {



    $scope.envoyerMessagePrives = function (user_id, message) {
      Message.postMessagePrives(user_id, message)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.listeAmis = function (data) {
        console.log(angular.fromJson($window.localStorage.user).ami)
        Search.searchAmisById(data).success(function (data) {
        $scope.amis = data
            
      }).error(function (data) {
        console.log(data)
      });
        return $scope.amis
      };
    $scope.listeAmis(angular.fromJson($window.localStorage.user).ami)

    $scope.voirAmisMessages = function (id) {
      console.log(id)
      $scope.select = id
      Message.getMessagesPrives(id).success(function (data) {
        console.log(data)
        $scope.MessagesPrivesRecus = data; 

        })
          return $scope.MessagesPrivesRecus
      };

    
  })