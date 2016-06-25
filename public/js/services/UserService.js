(function(){
  'use strict';

angular.module('MyApp')
         .service('userService', ['$q', function ($q){

    var users = [
      {
        name: 'mon Profil',
        avatar: 'svg-1',
        img:'icon-user',
        content: 'Que tu sois étudiant ou jeune diplômé, joueur occasionnel ou pro-gamer, confronte-toi online aux joueurs League of Legends de la France entière et tente d’atteindre les phases finales en live à Paris ! ',
        game:[{   name:'Hearthstone',
                  price:'750€',
                  img:'http://media.blizzard.com/hearthstone/images/backgroundart.jpg'
              },
              {   name:'League of legend',
                  price:'2000€',
                  img:'http://euw.leagueoflegends.com/sites/default/files/styles/scale_xlarge/public/upload/project_yasuo_splash.jpg?itok=s6-zHG7H'
              },
              {   name:'Clash Royal',
                  price:'7500€',
                  img:'http://www.journaldugeek.com/wp-content/blogs.dir/1/files/2016/03/clash-royale-hack-gemmes.jpg'
              },
              {   name:'Rocket leaugue',
                  price:'2500€',
                  img:'http://www.gohanblog.fr/www/wp-content/uploads/2015/07/test-rocket-league-PS4.jpg'
              }]
      },
      {
        name: 'modifier Profil',
        avatar: 'svg-2',
        img:'icon-wrench',
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.',
        game:[{   name:'MyName',
                  img:'http://img0.mxstatic.com/wallpapers/44e535006cffbc1b6e41f72d5e9df1e4_large.jpeg'
                }
        
              ]
        },
      {
        name: 'liste Amis',
        avatar: 'svg-2',
        img:'icon-users',
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.',
        game:[{   name:'Streaming Hearthstone',
                  price:'750€',
                  img:'http://team-jara.com/wp-content/uploads/2016/01/epique.jpg'
              },
              {   name:'Streaming League of Legends',
                  price:'2000€',
                  img:'http://euw.leagueoflegends.com/sites/default/files/styles/scale_xlarge/public/upload/project_yasuo_splash.jpg?itok=s6-zHG7H'
              }]
 
        
      },
      {
        name: 'FAQ',
        avatar: 'svg-2',
        img:'icon-lab',
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.',
        game:[{   name:'Streaming Hearthstone',
                  price:'750€',
                  img:'http://team-jara.com/wp-content/uploads/2016/01/epique.jpg'
              },
              {   name:'Streaming League of Legends',
                  price:'2000€',
                  img:'http://euw.leagueoflegends.com/sites/default/files/styles/scale_xlarge/public/upload/project_yasuo_splash.jpg?itok=s6-zHG7H'
              }]
 
        
      },  
    ];

  // Promise-based API
    return {
      loadAllUsers : function() {
        // Simulate async nature of real remote calls
        return $q.when(users);
      }

    };
  

}])
})();
