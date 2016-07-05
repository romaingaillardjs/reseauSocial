var User = require('../models/User');

exports.search = function(req, res, next) {
   User.find(function(err, user){
    return res.send(user);
   })
};
exports.searchById = function(req, res, next) {
  User.findById(req.body.id, function(err, user) {
    return res.send(user);
  });
};