angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $rootScope, $location, $window, $auth, $http,Search) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/');
    };
    $scope.searchRequest = function() {
      return Search.searchRequest();
      // return $http.get('/search')
      //         .success(function (data) {
      //           console.log(data)
      //           $scope.items = data;
      //         })
      //         .error(function (data) {
      //           console.log(data)
      //         })

      // return Search.searchRequest()
      //   .success(function(data) {
      //     return $scope.items = data;
      //   })
      //   .error(function (error) {
      //     return console.log(error);
      //   })

    };  
    $scope.searchRequest();
    $scope.viewProfil = function(id) {
      console.log(id)
      return Search.searchById(id)
        .success(function (data) {
          $rootScope.userList = data;
          $location.path('/profil/'+data.name)
        })
        .error(function (data) {
          console.log('erreur : ' + data);
        })
      //$location.path('/profil/'+id)
    };   
  });
 

