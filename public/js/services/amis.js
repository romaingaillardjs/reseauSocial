angular.module('MyApp')
  .factory('Amis', function($http, Search) {
    return {
      get_friends_list : function(data) {
        	return  Search.search_List_By_Id(data)
     	},
      viewProfil : function(data) {
          return Search.search_By_Id(data)
      },
     	AjouterAmi : function(amiAjoutant, amiAjoute) {
          return $http.post('/AjouterAmi',{ amiAjoutant : amiAjoutant, amiAjoute : amiAjoute})
      },
      recomanderAmi : function(idArecommande, idcible, idArecommandeName, idcibleName) {
          return $http.post('/recomanderAmi', 
          {
            idArecommande : idArecommande, 
            idcible : idcible, 
            idArecommandeName : idArecommandeName, 
            idcibleName : idcibleName
          })
      },
      confirmerAmi : function(id) {
          return $http.post('/confirmerAmi', {id:id})
      },
      supprimerAmi : function(id,userid) {
          return $http.post('/supprimerAmi', {id:id,userid:userid})
      }
    
    }
  });
