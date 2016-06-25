(function(){
  'use strict';

angular.module('MyApp')
         .service('faqService', ['$q', function ($q){
    
    
    var FAQ = [
    {
      index:0,
      titre: '<p>Qu’est-ce que l’ACENSI University League et qui peut y participer&nbsp;?</p>' , 
      content:" <p> L ’ACENSI University League est la seule compétition eSport et de développement ouverte à tous les étudiants et jeunes diplômés de France. Le tournoi eSport, l’ACENSI Gaming Cup, se déroule sur les jeux Hearthstone et League of Legends tandis que la compétition de développement, l’ACENSI Dev Cup, porte sur les technologies Java, JavaScript, C++, C# et PHP5.<br><br> Les inscriptions sont ouvertes à TOUS les étudiants et les jeunes diplômés de l’année en cours</p>"

    },
    {
      index:1,
      titre: 'Quel est le planning de la compétition&nbsp;?' , 
      content:'<p>Le planning de l’<strong>ACENSI Gaming Cup</strong> sera le suivant: </p><ul><li><strong>Inscriptions:</strong> 1er Septembre - 16 Novembre </li><li><strong>Qualifications:</strong> 28 Septembre - 16 Novembre</li><li><strong>Phases finales online: </strong> 23 Novembre</li><li><strong>Phases finales offline: </strong>5 et 6 Décembre</li></ul><br><p>Le planning de l’<strong>ACENSI Dev Cup</strong> sera le suivant: </p><ul><li><strong>Inscriptions:</strong> 1er Septembre - 15 Novembre </li><li><strong>Phase 1 online:</strong> 26 Octobre – 16 Novembre</li><li><strong>Phase 2 online:  </strong>23 Novembre</li><li><strong>Phase 3 offline: </strong>5 Décembre</li></ul>'
    },
    {
      index:2,
      titre: 'Quelles sont les dates des 8 rounds de qualification eSport&nbsp;?' , 
      content:'<ul><li>Qualifier 1 : Lundi 28 Septembre</li><li>Qualifier 2 : Lundi 5 Octobre</li><li>Qualifier 3 : Lundi 12 Octobre</li><li>Qualifier 4 : Lundi 19 Octobre</li><li>Qualifier 5 : Lundi 26 Octobre</li><li>Qualifier 6 : Lundi 2 Novembre</li><li>Qualifier 7 : Lundi 9 Novembre</li><li>Qualifier 8 : Lundi 16 Novembre</li></ul>'
    },
    {
      index:3,
      titre: 'Puis-je participer à plusieurs rounds de qualification et combien sont qualifiés par round&nbsp;?' , 
      content:'<p>Les 8 rounds de qualifications sont ouverts à tous les inscrits.<br>Une personne s’inscrivant dès le 1er tournoi le 28 septembre 2015 aura donc jusqu\' à 8 chances de se qualifier pour les phasesfinales.<br><br>Pour League of Legends, les 4 meilleures équipes de chaque qualifier sont qualifiées pour les phases finales online.<br>Pour Hearthstone, les 4 meilleurs joueurs de chaque qualifier sont qualifiés pour les phases finales online.</p>'
    },
    {
      index:4,
      titre: 'Quelles sont les dates des 8 rounds de qualification eSport&nbsp;?' , 
      content:'<p>Le planning de l\'<strong>ACENSI Gaming Cup</strong> sera le suivant: </p><ul><li><strong>Inscriptions:</strong> 1er Septembre - 16Novembre </li><li><strong>Qualifications:</strong> 28 Septembre - 16 Novembre</li><li><strong>Phases finales online: </strong> 23 Novembre</li><li><strong>Phases finales offline: </strong>5 et 6 Décembre</li></ul><br><p>Le planning de l’<strong>ACENSI Dev Cup</strong> sera le suivant: </p><ul><li><strong>Inscriptions:</strong> 1er Septembre - 15 Novembre </li><li><strong>Phase 1 online:</strong> 26 Octobre – 16 Novembre</li><li><strong>Phase 2 online:  </strong>23 Novembre</li><li><strong>Phase 3 offline: </strong>5 Décembre</li></ul>'
    },
     {
      index:5,
      titre: 'Où et quand faut-il s’inscrire pour participer&nbsp;?' , 
      content:'<p> Pour t’inscrire, clique sur le bouton « inscription » en haut à droite de cette page ou sur l\'onglet correspondant à la compétition de ton choix. <br> <br>Pour la Gaming Cup, tu as du 1er Septembre au 16 Novembre pour t’inscrire.<br>Pour la Dev Cup, tu as du 1er Septembre au 26 Octobre pour t’inscrire,<br> <br> Tente ta chance ! </p>'
    },
     {
      index:6,
      titre: 'Faut il avoir un bon niveau pour participer aux tournois&nbsp;?' , 
      content:' <p>Bien sûr que non ! Des joueurs de tous niveaux viennent s\'affronter chaque année.</p>'
    },
    {
      index:7,
      titre: 'Est-ce qu’il y a des frais d’inscriptions&nbsp;?' , 
      content:' <p> Non, l’ACENSI University League est un tournoi gratuit pour tous les étudiants et jeunes diplômés dans l’année.</p>'
    },
    {
      index:8,
      titre: 'Est-il possible de participer à la Gaming Cup et à la Dev Cup&nbsp;?' , 
      content:' <p> Tu peux bien entendu t’inscrire à la Dev Cup et aux deux jeux de la Gaming Cup si tu t’en sens capable ! </p>'
    },
    {
      index:9,
      titre: 'Pour le tournoi League of Legends, faut-il 5 joueurs d’une même école&nbsp;?' , 
      content:'<p>Pas nécessairement !<br><br>Tu peux venir avec quatre amis des 4 coins de la France, tant qu’ils sont étudiants ou jeunes diplômés !</p>'
    },
    {
      index:10,
      titre: 'Peut-on retrouver les vidéos de nos matchs&nbsp;?' , 
      content:' <p>Toutes les vidéos sont disponibles en direct ou à la demande via l’onglet STREAMING/VOD ou sur ce <a href="/2015/streaming">lien</a>.</p>'
    },
    {
      index:10,
      titre: ' <p class="contact-us">Pour toute autre question, vous pouvez nous contacter <a href="contact">ici</a> ! </p>' , 
      content:''
    }
  

    ];


    
    

    // Promise-based API
    return {
      loadAllFaq  : function () {
      return $q.when(FAQ);
    }
    };
  

}])
})();
