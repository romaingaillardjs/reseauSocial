var User = require('../models/User');

exports.postMessagePublics = function(req, res, next) {

  console.log(  req.body.user_id + req.body.message + req.user.id)

  User.findOne({ _id : req.body.user_id }, function(err, user) {
              user.messagePublicsRecus.push(
                {
                "de":""+req.user.id+"",
                "message" : ""+req.body.message+"",
                }
              )
              user.save()
            });
   User.findOne({ _id : req.user.id }, function(err, user) {
              user.messagePublicsEnvoyes.push(
                {
                "a":""+req.body.user_id+"",
                "id":""+req.body.message+"",
                }
              )
              user.save()
            });
              return res.send({ msg:"vous avez envoyé un message public à cette personne"})
        }
exports.postMessagePrives = function(req, res, next) {

  console.log(  req.body.user_id + req.body.message + req.user.id)

  User.findOne({ _id : req.body.user_id }, function(err, user) {
              user.messagePrivesRecus.push(
                {
                "de":""+req.user.id+"",
                "message" : ""+req.body.message+"",
                }
              )
              user.save()
            });
   User.findOne({ _id : req.user.id }, function(err, user) {
              user.messagePrivesEnvoyes.push(
                {
                "a":""+req.body.user_id+"",
                "id":""+req.body.message+"",
                }
              )
              user.save()
            });
              return res.send({ msg:"vous avez envoyé un message prive à cette personne"})
        }

        exports.getMessagePrives = function(req, res, next) {
         

  console.log(  req.body.id + req.user.id )


// , messagePrivesEnvoyes : { recepteur : req.user.id }
    User.find( { _id : req.body.id  }, function(err, user) {
                console.log(user)
              
            });  

              return res.send({ msg:"vous avez envoyé un message prive à cette personne"})
  }

        
