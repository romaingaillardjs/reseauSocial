var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});

/**
 * GET /contact
 */
exports.contactGet = function(req, res) {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 */

exports.contactPost = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('message', 'Message cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  var mailOptions = {
    from: req.body.name + ' ' + '<'+ req.body.email + '>',
    to: 'your@email.com',
    subject: '✔ Contact Form | Mega Boilerplate',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(err) {
    res.send({ msg: 'Thank you! Your feedback has been submitted.' });
  });
};


exports.ajouterAmiPost = function(req, res) {

  console.log('je passe par la' + req.body.amiAjoute.name)
  console.log('je passe par la' + req.body.amiAjoutant.email)

  var mailOptions = {
    from:  req.body.amiAjoute.name + ' ' + '<'+ req.body.amiAjoutant.email  + '>',
    to: req.body.amiAjoute.email,
    subject: '✔ aSocialNetworkForYou :) | '+'  '+req.user.name +'  '+ ' | vous à envoyé une demande d\'ajout à sa liste d\'amis ',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(err) {
    console.log(err);
    return res.send({ msg:"vous etes maintenant ami avec cette personne"})
  });
};