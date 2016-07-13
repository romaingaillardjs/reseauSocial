
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
};

var recommandationsSchema = new mongoose.Schema({
  setRecommandation: [mongoose.Schema.Types.Mixed],
  getRecommandation: [mongoose.Schema.Types.Mixed],
  clientRecommandation: [mongoose.Schema.Types.Mixed],
}, schemaOptions);

Recommandation = mongoose.model('Recommandation', recommandationsSchema);

module.exports = Recommandation;