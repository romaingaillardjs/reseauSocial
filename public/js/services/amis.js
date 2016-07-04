angular.module('MyApp')
  .factory('Amis', function($http, $window) {
    return {
      listeAmisRequest : function(data) {
        	data = $window.localStorage.user;
        	console.log(data);
            return data
     	},
     	AjouterAmi : function(id) {
          return $http.post('/AjouterAmi', {id:id})
          .success(function (data) {
            console.log(data)
          })
          .error(function (data) {
            console.log(data)
          })
      },
      recomanderAmi : function(idArecommande, idcible) {
          return $http.post('/recomanderAmi', {idArecommande:idArecommande, idcible:idcible})
          .success(function (data) {
            console.log(data)
          })
          .error(function (data) {
            console.log(data)
          })
      },
      confirmerAmi : function(id) {
          return $http.post('/confirmerAmi', {id:id})
          .success(function (data) {
            console.log(data)
          })
          .error(function (data) {
            console.log(data)
          })
      }
    }
  });
