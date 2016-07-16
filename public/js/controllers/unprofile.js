angular.module('MyApp')
.controller('ProfilCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams,$interval, Search, Amis, Message) {
    $interval.cancel($rootScope.MajMessage)
    $interval.cancel($rootScope.stop)
    $scope.ajouterAmis = true;
    $scope.demande_d_ajout = true

$scope.searchRequest = function() {
  Search.search_All_Ids().success(function (data) {
    $scope.userlist = data
    $scope.majProfil()
  });
};
$scope.voirAmisMessages = function (id,name) {
  Message.getMessagesPublics(id)
    .success(function (data) {
      console.log(data)
      $scope.messagePublicsRecus = data; 
    })
};
$scope.ajouterAmi = function  (user) {
    amiAjoute = user
    amiAjoutant = angular.fromJson($window.localStorage.user)
	Amis.AjouterAmi(amiAjoutant, amiAjoute)
	.success(function  (data) {
    $scope.majProfil()
	})
	.error(function  (data) {
	})   	
};  
$scope.recomanderAmi = function (user, select) {
  select = JSON.parse(select)
   idArecommande = $scope.user._id, idcible = select._id, idArecommandeName = $scope.user.name, idcibleName = select.name
    Amis.recomanderAmi(idArecommande, idcible, idArecommandeName, idcibleName)
    .success(function  (data) {
      console.log(data)
      $scope.majProfil()
    })
    .error(function  (data) {
        console.log(data)
    })
}; 
$scope.envoyerMessagePublic = function (user_id, message) {
  Message.postMessagePublics(user_id, message)
    .then(function(response) {
      $scope.messages = {
        success: [response.data]
      };
      $scope.majProfil()
    })
    .catch(function(response) {
      $scope.messages = {
        error: Array.isArray(response.data) ? response.data : [response.data]
      };
    });
};
$scope.repondreMessagePublic = function (user_id, message, name) {
  Message.repondreMessagePublics(user_id, message, name)
  .success(function (data) {
    $scope.majProfil()
    console.log('je suis la')
    })
    .catch(function(response) {
      $scope.messages = {
        error: Array.isArray(response.data) ? response.data : [response.data]
      };
    });
};
$scope.supprimerMessage = function (id) {
  Message.supprimerMessage(id)
  .success(function (argument) {
    $scope.majProfil()
  })
}
$scope.listeAmis = function (data) {
  if(data){ Search.search_List_By_Id(data).success(function (data) {
    $scope.amis = data     
  }).error(function (data) {

  });
  }
    return $scope.amis
};
$scope.isFriends = function () {
    for (var i = 0; i < $scope.user.ami.length; i++) 
    {
      if ($scope.user.ami[''+i+''].id == $rootScope.currentUser._id) 
      {
          $scope.ajouterAmis = false
      }
    }
};
$scope.demandeAjout = function  () {
    for (var i = 0; i < $scope.user.demande_d_ajout.length; i++) 
    {
      if ($scope.user.demande_d_ajout[''+i+''].id == $rootScope.currentUser._id) 
      {
          $scope.demande_d_ajout = false
      }
    }
};
$scope.viewProfil = function(id) {
  return Search.search_By_Id(id)
  .success(function (data) {  
    $rootScope.unProfil = data
    $scope.user = $rootScope.unProfil;
    $window.localStorage.lastPrifilView = angular.fromJson($rootScope.unProfil)._id
    $scope.isFriends()
    $scope.listeAmis($scope.user.ami)
    $scope.demandeAjout()

  }).error(function  (data) {
  })
};

$scope.majProfil = function () {
  if ($rootScope.unProfil==undefined) {
  $scope.viewProfil($rootScope.unProfilId)
  $scope.voirAmisMessages($rootScope.unProfilId,name)
  }else{
    $scope.user = $rootScope.unProfil;
    $scope.viewProfil($scope.user._id)
    $scope.voirAmisMessages($scope.user._id,name)
    
  }
}
$scope.majProfil()
$scope.searchRequest()
});