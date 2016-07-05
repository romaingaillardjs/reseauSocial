var User = require('../models/User');

exports.postMessage = function(req, res, next) {

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
              return res.send({ msg:"vous avez envoyé un message à cette personne"})
        }
