
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
};

var messagesSchema = new mongoose.Schema({
  emetteur: String,
  recepteur: String,
  message: String,
  vu: Boolean
}, schemaOptions);

MessagePrive = mongoose.model('MessagePrive', messagesSchema);

module.exports = MessagePrive;