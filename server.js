var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 1337;
var User = require('./app/models/user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
    next();
})

app.use(morgan('dev'));

//CONNECT TO DATABASE
mongoose.connect('mongodb://kirill:kirill@ds039165.mlab.com:39165/heroku_f861l738');

//ROUTES
app.get('/', function(req, res) {
    res.send('welcome');
});

var apiRouter = express.Router();
apiRouter.use(function(req, res, next) {
    console.log('Somebody coming!');
    next();
})

apiRouter.get('/', function(req, res) {
    res.json({message: 'it is api!'});
});
apiRouter.route('/users')
.post(function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err) {
        if (err) {
            if (err.code == 11000) {
                return res.json({success: false, message: 'A user with that username already exists'});
            } else {
                return res.send(err);
            }            
        }
        res.json({message: 'User created!'});
    });
})
.get(function(req, res) {
   User.find(function(err, users) {
       if (err) {
           return res.send(err);
       }
       res.json(users);
   });
});



app.use('/api', apiRouter);


//START SERVER
app.listen(port);
console.log('started at ' + port);