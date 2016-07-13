angular.module('MyApp')
  .controller('MessagesCtrl', function($scope, $rootScope, $window, $timeout,$location, Contact, Message) {
$scope.user = $rootScope.currentUser;

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
      return Message.listeAmis(data)
        .success(function (data) {
        $scope.amis = data 
      })
    };
    $scope.listeAmis($scope.user.ami).success(function (data) {
    $scope.checkNbMessage()
    })



$scope.nbNoViewMessage = function (id) {    
      return Message.countNoViewMessage(id)
          .success(function (data) {
            console.log(data)
          }) 
        } 

 $scope.getnbNoViewMessage = function (id,i) { 
        $scope.nbNoViewMessage(id)
          .then(function (data) { 
            console.log(data)
            $scope.toto = i;
            $scope.amis[""+$scope.toto+""].countNoViewMessages = data.data.nbmessage
        })
      } 
$scope.checkNbMessage = function () {
    for (var i = 0; i < $scope.amis.length ; i++) 
    {     
      $scope.getnbNoViewMessage($scope.amis[""+i+""]._id,i)
    }
}

      
    $scope.voirAmisMessages = function (id,name) {
      console.log(id)
      $scope.select = id
      $scope.currentAmiMessageName = name;
      Message.getMessagesPrives(id).success(function (data) {
        console.log(data)
        $scope.MessagesPrivesRecus = data; 
        $scope.checkNbMessage()
        })
          return $scope.MessagesPrivesRecus
      };

    
  })