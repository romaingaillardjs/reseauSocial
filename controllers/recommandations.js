var mongoose = require('mongoose');
var User = require('../models/User');
var Recommandation = require('../models/Recommandations');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});

exports.postRecommandation = function  (req, res, next) {
  User.findOne({
      _id : req.body.idcible , 
      ami : { id : req.body.idArecommande}
      }, function(err, user) {
        if(user){
          return res.send({ msg:"ces personnes sont deja en relation"})
        } else { 
        	  Recommandation.findOne(
      	{
      		setRecommandation: req.user.id,
      		getRecommandation: req.body.idArecommande ,
      		clientRecommandation: req.body.idcible,
        }, 
        function(err, recommandation) {
          if(recommandation){
            return res.send({ msg:"vous avez deja envoyé une demande de recomandation"})
          } else {
              recommandation = new Recommandation
    			  ({
            		setRecommandation: req.user.id,
            		getRecommandation: req.body.idArecommande ,
            		clientRecommandation: req.body.idcible,
                setRecommandationName: req.user.name,
                getRecommandationName: req.body.idArecommandeName, 
                clientRecommandationName: req.body.idcibleName ,
    			  });
              console.log('je suis ici ----------------------------------------------')
          		recommandation.save()
          };
            return res.send({ msg:"vous avez envoyé une demande de recomandation a cette personne"})
          })
        }
      });
    }
      exports.confirmerAmiRecomandation = function  (req, res, next) {
        User.findOne({
      _id : req.user.id , 
      ami : { id : req.body.user.getRecommandation}
      }, function(err, user) {
        if(user){
          return res.send({ msg:"vous etes deja ami avec cette personne"})
        }else{
            User.update( { _id: req.body.user.getRecommandation}, 
              { 
                $push: { ami: {"id":""+req.body.user.clientRecommandation+""} } 
              } , function() {})
            User.update( { _id: req.body.user.clientRecommandation }, 
              { 
                $push: { ami: {"id":""+req.body.user.getRecommandation+""} } 
              } , function() {})
              Recommandation.remove({ _id: req.body.user._id }
                , function(err) {
              });     
        }
        return res.send({ msg:"vous avez confirmé cette personne comme ami"})
      })
    };   
      exports.refuserRecommandation = function  (req, res, next) {
            Recommandation.remove({ _id: req.body.user._id }, function(err) {});    
      return res.send({ msg:"vous avez annulé la demmande d'ami"})
};
  exports.getRecommandation = function  (req, res, next) {
    Recommandation.find(
        { 
          $or: [ { "getRecommandation" : req.user.id  } , { "clientRecommandation" : req.user.id } ]
        },
          function(err, recommandations) {
          console.log(recommandations)
          return res.send(recommandations)        
    })
  };