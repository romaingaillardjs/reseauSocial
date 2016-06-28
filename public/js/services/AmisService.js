(function(){
  'use strict';

angular.module('MyApp')
         .service('amisService', function (){
    
    var AMIS = [
    {
      index:0,
      titre: 'michel' , 
      status : 'confirmé',
      name:'MyName',
      img:'http://img0.mxstatic.com/wallpapers/44e535006cffbc1b6e41f72d5e9df1e4_large.jpeg'     

    },
    {
      index:1,
      titre: 'janne' , 
      status : 'attenteAjout',
      name:'MyName',
      img:'http://img0.mxstatic.com/wallpapers/44e535006cffbc1b6e41f72d5e9df1e4_large.jpeg'
    },
    {
      index:2,
      titre: 'romain' , 
      status : 'recomandéPar',
      recomandation : 'hugo',
      name:'MyName',
      img:'http://img0.mxstatic.com/wallpapers/44e535006cffbc1b6e41f72d5e9df1e4_large.jpeg'
    },
    {
      index:4,
      titre: 'romain', 
      status : 'invitationEncours',
      name:'MyName',
      img:'http://img0.mxstatic.com/wallpapers/44e535006cffbc1b6e41f72d5e9df1e4_large.jpeg'
    },
    {
      index:5,
      titre: 'catherine', 
      status : 'recomandéPar',
      recomandation : 'lucien',
      name:'MyName',
      img:'http://img0.mxstatic.com/wallpapers/44e535006cffbc1b6e41f72d5e9df1e4_large.jpeg'
    }
    ];

    // Promise-based API
    return {
      loadAllFaq  : function () {
      return AMIS
      }
    };
  

})
})();
