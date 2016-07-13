var mongoose = require('mongoose');
var User = require('../models/User');
var Recommandation = require('../models/Recommandations');


exports.postRecommandation = function  (req, res, next) {
  console.log(req.body.idArecommande + req.body.idcible)

  User.findOne({
      _id : req.body.idcible , 
      ami : { id : req.body.idArecommande}
      }, function(err, user) {
    if(user){
      res.send({ msg:"ces personnes sont deja en relation"})
      //return res.send("vous etes deja ami avec cette personne")
    } else { 
    	  Recommandation.findOne(
  	{
  		setRecommandation: req.user.id,
  		getRecommandation: req.body.idArecommande ,
  		clientRecommandation: req.body.idcible
	}
	, function(err, recommandation) {
      if(recommandation){
        res.send({ msg:"vous avez deja envoyé une demande de recomandation"})
        //return res.send("vous etes deja ami avec cette personne")
      } else{
          recommandation = new Recommandation
			  ({
  		setRecommandation: req.user.id,
  		getRecommandation: req.body.idArecommande ,
  		clientRecommandation: req.body.idcible
			  });
    		recommandation.save()
      };
      })
         return res.send({ msg:"vous avez envoyé une demande de recomandation a cette personne"})
        }
      });
    }