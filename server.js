// npm
var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    dotenv = require('dotenv'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    moment = require('moment'),
    request = require('request');

// Load environment variables from .env file
dotenv.load();

// Models
var User = require('./models/User');

// Controllers
var userController = require('./controllers/user'),
    contactController = require('./controllers/contact'),
    membresController = require('./controllers/membres'),
    amisController = require('./controllers/amis'),
    messagesController = require('./controllers/messages'),
    recommandationController = require('./controllers/recommandations');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

app.post('/contact', contactController.contactPost);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);
app.post('/forgot', userController.forgotPost);
app.post('/reset/:token', userController.resetPost);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.get('/search', userController.ensureAuthenticated, membresController.search);
app.post('/profil',userController.ensureAuthenticated, membresController.searchById);
app.post('/AmisById', userController.ensureAuthenticated, amisController.searchAmisById);
app.post('/AjouterAmi', userController.ensureAuthenticated, amisController.AjouterAmi, contactController.ajouterAmiPost);
app.post('/getRecommandation', userController.ensureAuthenticated, recommandationController.getRecommandation);
app.post('/recomanderAmi', userController.ensureAuthenticated, recommandationController.postRecommandation);
app.post('/confirmerAmiRecomandation', userController.ensureAuthenticated, recommandationController.confirmerAmiRecomandation);
app.post('/confirmerAmi', userController.ensureAuthenticated, amisController.confirmerAmi);
app.post('/AnnulerDemandeAmi', userController.ensureAuthenticated, amisController.AnnulerDemandeAmi);
app.post('/supprimerAmi', userController.ensureAuthenticated, amisController.supprimerAmi);
app.post('/getMessagesPublics', userController.ensureAuthenticated, messagesController.getMessagesPublics);
app.post('/postMessagePublics', userController.ensureAuthenticated, messagesController.postMessagePublics);
app.post('/repondreMessagePublics', userController.ensureAuthenticated, messagesController.repondreMessagePublics);
app.post('/postMessagePrives', userController.ensureAuthenticated, messagesController.postMessagePrives);
app.post('/getMessagesPrives', userController.ensureAuthenticated, messagesController.getMessagePrives);
app.post('/supprimerMessage', userController.ensureAuthenticated, messagesController.supprimerMessage);
app.post('/countNoViewMessage', userController.ensureAuthenticated, messagesController.countNoViewMessage);
app.post('/searchNbMessages', userController.ensureAuthenticated, messagesController.searchNbMessages);
app.post('/searchNbNotification', userController.ensureAuthenticated, userController.searchNbNotification);



app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});


// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
