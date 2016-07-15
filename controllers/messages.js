var User = require('../models/User');
var Message = require('../models/Messages');
var mongoose = require('mongoose');
var conn = mongoose.connection;

exports.postMessagePublics = function(req, res, next) {
  User.findOne({ _id : req.body.user_id }, function(err, user) {
              user.messagePublicsRecus.push(
                {
                "de":""+req.user.id+"",
                "message" : ""+req.body.message+"",
                "time" : ""+Date.now()+""
                }
              )
              user.save()
            });
   User.findOne({ _id : req.user.id }, function(err, user) {
              user.messagePublicsEnvoyes.push(
                {
                "a":""+req.body.user_id+"",
                "id":""+req.body.message+"",
                "time" : ""+Date.now()+""
                }
              )
              user.save()
            });
              return res.send({ msg:"vous avez envoyé un message public à cette personne"})
        }
exports.postMessagePrives = function(req, res, next) {
  message = new Message
  ({
    emetteur: ""+req.user.id+"",
    recepteur: ""+req.body.user_id+"",
    message: ""+req.body.message+"",
    vu:false
  });
    message.save()
      return res.send({ msg:"vous avez envoyé un message prive à cette personne"})
}
exports.getMessagePrives = function(req, res, next) {
  var Messages;
    Message.update( 
      { "emetteur" : req.body.id , "recepteur" : req.user.id },
      { "vu" : true} ,
      { multi: true },
      function(err, messages) {
    })
    Message.find( 
      { 
        $or: [ { "emetteur" : req.body.id , "recepteur" : req.user.id },{ "emetteur" : req.user.id , "recepteur" : req.body.id } ]
      },
        function(err, messages) {
        return res.send(messages)        
    })
}
exports.countNoViewMessage = function(req, res, next) {
   Message.find( 
      { "emetteur" : req.body.id , "recepteur" : req.user.id , "vu" : false }
      , function(err, messages) {
        nbmessage = messages.length
        return res.send({nbmessage : nbmessage})
  })   
}
exports.searchNbMessages = function(req, res, next) {
   Message.find( 
      { "recepteur" : req.user.id , "vu" : false }
      , function(err, messages) {
        nbmessage = messages.length
        return res.send({nbmessage : nbmessage})
  })   
}

        
