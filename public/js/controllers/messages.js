angular.module('MyApp')
.controller('MessagesCtrl', function($scope, $rootScope, $window, $timeout,$interval ,$location,$anchorScroll, Contact, Message) {
$scope.user = $rootScope.currentUser;
var MajMessage = false;

$scope.nbNoViewMessage = function (id) {    
      return Message.countNoViewMessage(id)
          .success(function (data) {
          }) 
        } 
$scope.getnbNoViewMessage = function (id,i) { 
        $scope.nbNoViewMessage(id)
          .success(function (data) { 
            $scope.toto = i;

            if (!($scope.amis[""+$scope.toto+""].countNoViewMessages))
            {
              $scope.amis[""+$scope.toto+""].countNoViewMessages = data.nbmessage 
            }

            if (($scope.amis[""+$scope.toto+""].countNoViewMessages) < data.nbmessage)
            {
              $scope.amis[""+$scope.toto+""].countNoViewMessages = data.nbmessage 
            }

        })
} 
$scope.checkNbMessage = function () {
    for (var i = 0; i < $scope.amis.length ; i++) 
    {     
      $scope.getnbNoViewMessage($scope.amis[""+i+""]._id,i)
    }
}
$scope.majNbMessage = function() {

  if (!$rootScope.MajMessage) 
    {
      $rootScope.MajMessage = $interval(function() {
      $scope.listeAmis($scope.user.ami)
        .success(function (data) {
          $scope.checkNbMessage()
        })
      },1000)
    } else {
      $interval.cancel($rootScope.MajMessage)
    }
}
$scope.gotoBottom = function() {
      $location.hash('bottom');
      $anchorScroll();
    };
    $scope.gotoBottom()

$scope.envoyerMessagePrives = function (user_id, message) {
  Message.postMessagePrives(user_id, message)
    .then(function(response) {
      $scope.messages = {
        success: [response.data]
      };
      $scope.texteduMessage ='';
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
$scope.majNbMessage()
})

$scope.voirAmisMessages = function (id,name) {
  Message.getMessagesPrives(id)
    .success(function (data) {
      $scope.MessagesPrivesRecus = data; 
      $timeout(function () {
        $scope.gotoBottom()
      }, 500)
    })
    if (angular.isDefined($rootScope.stop)) 
      {
        $interval.cancel($rootScope.stop)
      }
    $rootScope.stop = $interval(function() {
      Message.getMessagesPrives(id)
        .success(function (data) {
        if (($scope.MessagesPrivesRecus.length > 0) && (data.length > $scope.MessagesPrivesRecus.length)) 
          {
            $scope.MessagesPrivesRecus = data; 
            $timeout(function () {
             $scope.gotoBottom()
            },500)
          }
      })
    }, 2000);

  $scope.select = id
  $scope.currentAmiMessageName = name;
  }; 
})