angular.module('MyApp')
  .controller('MessagesCtrl', function($scope, $window, Contact, Search, Message) {
    $scope.envoyerMessagePrives = function (user_id, message) {
      Contact.postMessagePrives(user_id, message)
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
    $scope.listeAmis = function () {
      $scope.amis = angular.fromJson($window.localStorage.user).ami
      console.log($scope.amis)
          return $scope.amis 
      };
    $scope.listeAmis()

    $scope.voirAmisMessages = function (id) {
      console.log(id)
      Message.getMessagesPrives(id).success(function (data) {
        console.log(data)
        $scope.MessagesPrivesRecus = data; 
        })
          return $scope.MessagesPrivesRecus
      };

    
  })