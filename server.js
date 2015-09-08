var root = __dirname;
var express = require('express');
// var fs = require('fs');
var app = express();
var dotenv = require('dotenv');
dotenv.load();
var http = require("http");
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var logger = require('morgan');
var path = require('path');

var router = express.Router();

var http = require('http').Server(app);



// var key = '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';
var sendkey = process.env.SECRET_KEY;
var sendgrid = require('sendgrid')(sendkey);

app.set('port', (process.env.PORT || 3000));


app.listen(app.get('port'), function () {
  console.log("App running on port : ", app.get('port'));
});

app.engine('handlebars', exphbs({defaultLayout: 'main', extname: 'handlebars'}));
app.set('views', path.join(root, 'views'));
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(methodOverride(function(req, res) {
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   // look in urlencoded POST bodies and delete it
   var method = req.body._method
   delete req.body._method
   return method
 }
}));






// fs.readdirSync('./controllers').forEach(function (file) {
//  if(file.substr(-3) == '.js') {
//      route = require('./controllers/' + file);
//      console.log('this is the route', route);
//      route.controller(app);
//  };
// });

var email     = new sendgrid.Email({
  to:       'pradhanr03@gmail.com',
  from:     'daveonchaos@yahoo.com',
  subject:  'Subject goes here',
  text:     'Hello world'
});


app.post('/send', function(req, res) {
      
          sendgrid.send(email, function(err, json) {
  if (err) { return res.send('nope'); }
  res.send('yay');
});

    


  });









 




