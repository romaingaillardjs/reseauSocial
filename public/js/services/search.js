angular.module('MyApp')
	.factory('Search', function($http, $rootScope) {
  	return {
  		searchRequest: function() {
    		  return $http.get('/search')
          .success(function (data) {
            console.log(data)
          })
          .error(function (data) {
            console.log(data)
          })
  		},
  		searchById: function(data) {
          return $http.post('/profil', {id:data})
          .success(function (data) {
            console.log(data)
          })
          .error(function (data) {
            console.log(data)
          })
      },
      searchAmisById: function(data) {
          return $http.post('/AmisById', {idList:data})
      },
      searchNbNotification: function(data) {
          return $http.post('/AmisById', {idList:data})
          .success(function (data) 
            { 
             if (data.length > 0) 
              { 
                $rootScope.nbnotification = data.length
              }else{
                $rootScope.nbnotification = ''
              }
              console.log(data)    

            })
            .error(function (data) 
            {
            $rootScope.nbnotification = '';
            }); 
      }
    }
	});
    


