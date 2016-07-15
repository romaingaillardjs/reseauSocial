
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
};

var messagesSchema = new mongoose.Schema({
  emetteur: String,
  recepteur: String,
  message: String,
  reponse: [mongoose.Schema.Types.Mixed],
  vu: Boolean
}, schemaOptions);

MessagePublic = mongoose.model('MessagePublic', messagesSchema);

module.exports = MessagePublic;