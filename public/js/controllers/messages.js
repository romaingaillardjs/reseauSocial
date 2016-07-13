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
     $scope.getnbNoViewMessage()
    })



$scope.nbNoViewMessage = function (id, i) {    
      return Message.countNoViewMessage(id)
          .success(function (data) {
            $scope.i = i;
          }) 
        } 

$scope.getnbNoViewMessage = function () {  
  for (var i = 0; i < $scope.user.ami.length ; i++) {     
  $scope.unfonction = function  (data, i) {
    console.log('c fait..'+ data + i)
    $scope.amis[""+i+""].countNoViewMessages = data
    console.log($scope.user.ami[""+i+""])
      }
        $scope.nbNoViewMessage($scope.user.ami[""+i+""].id, i)
          .then(function (data) { 
            console.log(data)
            $scope.unfonction(data.data.nbmessage, $scope.i)
            
        })
      }        
  }
      
    $scope.voirAmisMessages = function (id) {
      console.log(id)
      $scope.select = id
      Message.getMessagesPrives(id).success(function (data) {
        console.log(data)
        $scope.MessagesPrivesRecus = data; 
        $scope.getnbNoViewMessage()
        })
          return $scope.MessagesPrivesRecus
      };

    
  })