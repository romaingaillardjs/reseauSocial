var mongoose = require('mongoose');
var User = require('../models/User');

exports.AjouterAmi = function  (req, res, next) {

  console.log(req.body.amiAjoute._id)
  console.log(req.user.id)


  User.findOne({
      _id : req.user.id , 
      ami : { id : req.body.amiAjoute._id}
      }, function(err, user) {
        if(user){
          console.log({ msg:"vous etes deja ami avec cette personne"})
          //return res.send("vous etes deja ami avec cette personne")
        }else{
            User.findOne({ _id : req.user.id }, function(err, user) {
                user.demande_en_attente.push({"id":""+req.body.amiAjoute._id+""})
                user.save()
                
                }
            )
            User.findOne({ _id : req.body.amiAjoute._id }, function(err, user) {
                user.demande_d_ajout.push({"id":""+req.user.id+""})
                user.save()
                next();
                
                }
            )
        }
      }
  );
}
exports.recomanderAmi = function  (req, res, next) {
  console.log(req.body.idArecommande + req.body.idcible)

  User.findOne({
      _id : req.body.idcible , 
      ami : { id : req.body.idArecommande}
      }, function(err, user) {
    if(user){
      res.send({ msg:"ces personnes sont deja en relation"})
      //return res.send("vous etes deja ami avec cette personne")
    } else { 
      User.findOne({
        _id : req.body.idcible , 
        recommandation : 
                {
                  "recommander":""+req.user.id+"",
                  "recommande":""+req.body.idArecommande+"",
                }
        }, function(err, user) {
      if(user){
        res.send({ msg:"vous avez deja envoyé une demande de recomandation"})
        //return res.send("vous etes deja ami avec cette personne")
      } else{
          User.findOne({ _id : req.body.idcible }, function(err, user) {
              user.clientRecommandation.push(
                {
                  "recommandeur":""+req.user.id+"",
                  "recommande":""+req.body.idArecommande+"",
                }
              )
              user.save()
            });
          User.findOne({ _id : req.user.id }, function(err, user) {
              user.setRecommandation.push(
                {      
                  "_a":""+req.body.idcible+"",
                  "recommande":""+req.body.idArecommande+"",
                }
              )
              user.save()
            });
          User.findOne({ _id : req.body.idArecommande }, function(err, user) {
              user.getRecommandation.push(
                {      
                  "recommandation_de":""+req.user.id+"",
                  "recommande_a":""+req.body.idcible+"",
                }
              )
              user.save()
            });
              return res.send({ msg:"vous avez envoyé une demande de recomandation a cette personne"})
        }
      });
    }
  });
};
exports.confirmerAmi = function  (req, res, next) {
  console.log(req.body.id)
   console.log(req.user.id)
  User.findOne({
      _id : req.user.id , 
      ami : { id : req.body.id}
      }, function(err, user) {
        if(user){
          console.log({ msg:"vous etes deja ami avec cette personne"})
          //return res.send("vous etes deja ami avec cette personne")
        }else{
            User.update( { _id: req.user.id }, 
              { 
                $pullAll: { demande_d_ajout: [{"id":""+req.body.id+""}] }
              } , function() {})
            User.update( { _id: req.user.id }, 
              { 
                $set: { ami: [{"id":""+req.body.id+""}] } 
              } , function() {})
            
            User.update( { _id: req.body.id }, 
              { 
                $pullAll: { demande_en_attente: [{"id":""+req.user.id+""}] } 
              } , function() {})
            User.update( { _id: req.body.id }, 
              { 
                $set: { ami: [{"id":""+req.user.id+""}] } 
              } , function() {})       
        }
      }
  );
  return res.send({ msg:"vous avez confirmé cette personne comme ami"})
}
exports.searchAmisById = function(req, res, next) {
var local = [];
for (var i = 0; i < req.body.idList.length; i++) {
  console.log(req.body.idList[i].id)
  local.push(mongoose.Types.ObjectId(''+req.body.idList[i].id+''))
};
console.log(local)
  User.find({
    '_id': { $in: local}
    }, function(err, UserList){
    console.log(UserList);
     return res.send(UserList)
    }
  )
};
