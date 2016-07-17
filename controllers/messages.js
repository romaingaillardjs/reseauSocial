var User = require('../models/User');
var MessagePublic = require('../models/MessagePublic');
var MessagePrive = require('../models/messagesPrive');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});

var conn = mongoose.connection;

exports.getMessagesPublics = function(req, res, next) {
    MessagePublic.update( 
      { "recepteur" : req.body.id },
      { "vu" : true} ,
      { multi: true },
      function(err, messages) {
    })
    MessagePublic.find( 
      { recepteur : req.body.id },
        function(err, messages) {
        console.log(messages)
              res.send(messages)
    })
}
exports.postMessagePublics = function(req, res, next) {
  console.log(req.body.user)
  message = new MessagePublic
  ({
    emetteur: ""+req.user.id+"",
    recepteur: ""+req.body.user._id+"",
    message: ""+req.body.user.message+"",
    vu:false
  });
    message.save()
  return res.send({ msg:"vous avez envoyé un message public à cette personne"})
}
exports.repondreMessagePublics = function(req, res, next) {
    MessagePublic.update( 
      { _id : req.body.user_id },
      {
        $push: 
        { 
          reponse: 
          {
          "name":""+req.body.name+"",
          "message":""+req.body.message+""
          }
        }
      },
      { multi: true },
      function(err, messages) {
      return res.send({ msg:"vous avez repondu"})
    })
}

exports.supprimerMessage = function(req, res, next) {
  MessagePublic.remove({ _id: req.body.id }, function(err) {
    res.send({ msg: 'votre message à été supprimer' });
  });
};


exports.postMessagePrives = function(req, res, next) {
  message = new MessagePrive
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
    MessagePrive.update( 
      { "emetteur" : req.body.id , "recepteur" : req.user.id },
      { "vu" : true} ,
      { multi: true },
      function(err, messages) {
    })
    MessagePrive.find( 
      { 
        $or: [ { "emetteur" : req.body.id , "recepteur" : req.user.id },{ "emetteur" : req.user.id , "recepteur" : req.body.id } ]
      },
        function(err, messages) {
        return res.send(messages)        
    })
}
exports.countNoViewMessage = function(req, res, next) {
   MessagePrive.find( 
      { "emetteur" : req.body.id , "recepteur" : req.user.id , "vu" : false }
      , function(err, messages) {
        nbmessage = messages.length
        return res.send({nbmessage : nbmessage})
  })   
}
exports.searchNbMessages = function(req, res, next) {
   MessagePrive.find( 
      { "recepteur" : req.user.id , "vu" : false }
      , function(err, messages) {
        nbmessage = messages.length
        return res.send({nbmessage : nbmessage})
  })   
}

        
