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

exports.confirmerAmi = function  (req, res, next) {
  console.log(req.body.id)
   console.log(req.user.id)
  User.findOne({
      _id : req.user.id , 
      ami : { id : req.body.id}
      }, function(err, user) {
        if(user){
          console.log({ msg:"vous etes deja ami avec cette personne"})
          return res.send({ msg:"vous etes deja ami avec cette personne"})
        }else{
            User.update( { _id: req.user.id }, 
              { 
                $pullAll: { demande_d_ajout: [{"id":""+req.body.id+""}] }
              } , function() {})
            User.update( { _id: req.user.id }, 
              { 
                $push: { ami: {"id":""+req.body.id+""} } 
              } , function() {})
            User.update( { _id: req.body.id }, 
              { 
                $pullAll: { demande_en_attente: [{"id":""+req.user.id+""}] } 
              } , function() {})
            User.update( { _id: req.body.id }, 
              { 
                $push: { ami: {"id":""+req.user.id+""} } 
              } , function() {})       
        }
        return res.send({ msg:"vous avez confirmé cette personne comme ami"})
      }  
  );
};

exports.supprimerAmi = function  (req, res, next) {
  console.log('suppr ami'+req.body.id)
  console.log('suppr ami'+req.user.id)
  User.finOne({ _id: req.user.id }, 
    function () {
      User.update({ _id: req.user.id }, 
      { 
        $pullAll: { ami: [{"id":""+req.body.id+""}] } 
      } , function(err, user) {
        console.log(user)
      })
      User.update({ _id: req.body.id },
      { 
        $pullAll: { ami: [{"id":""+req.user.id+""}] } 
      } , function(err, user) {
        console.log(user)
         
      })
  return res.send({ msg:"vous avez supprimé cette personne de votre liste d'ami"})
};


exports.searchAmisById = function(req, res, next) {
  var local = [];
  console.log(req.body.idList)
  for (var i = 0; i < req.body.idList.length; i++) {
    console.log(req.body.idList[i].id)
    local.push(mongoose.Types.ObjectId(''+req.body.idList[i].id+''))
  };
  console.log(local)
  User.find(
  {
    _id: { $in: local}
  }, function(err, UserList){
      console.log(UserList);
     return res.send(UserList)
    }
  )
};
