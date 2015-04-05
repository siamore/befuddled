var express = require('express');
var fs = require('fs');
var path = require('path');
var basicAuth = require('basic-auth');
var bodyParser = require('body-parser');

var app = express();
var mongo = require('mongodb').MongoClient;

var db = undefined;

var url = 'mongodb://localhost:27017/befuddled';
mongo.connect(url,function(err, con) { db = con; console.log("Connected to DB"); });

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Integrate body parser for post requests
app.use(bodyParser.json());

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  var db = req.db;

  if (user.name === 'foo' && user.pass === 'bar') {
    return next();
  } else {
    return unauthorized(res);
  };
};


app.get('/api/users/:ino', auth, function(req,res){
  console.log("Servicing" + req.get('accept'));
  res.send('{"I_am_Groot":'+ req.params.ino +'}');
});

app.post('/api/users', function(req, res){
  var db = req.db;
  console.log(req.body);
  db.collection('users').insert([req.body], function(err, result){
    if(err === null){
      res.json(req.body);
    } else {
      res.status(500).json(err);
    }
  });
});

app.use(express.static(path.join(__dirname, '../')));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        var full = {};
        full.reqBody = req.body;
        full.err = err;
        res.status(err.status || 500);
        res.json(full);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
});

function cleanup () {
  shutting_down = true;
  server.close( function () {
    console.log( "Closed out remaining connections.");
    // Close db connections, other chores, etc.
    db.close();

    //kill again for nodemon in development
    if (app.get('env') === 'development') {
      process.kill(process.pid, 'SIGUSR2');
    }
    process.exit();
  });

  setTimeout( function () {
   console.error("Could not close connections in time, forcing shut down");
   process.exit(1);
 }, 60*2*1000);

}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
//listen to nodemon kill signal
process.once('SIGUSR2', cleanup);

var server = app.listen(process.env.PORT, function () {

  var host = process.env.IP;
  var port = process.env.PORT;

  console.log('Example app listening at http://%s:%s', host, port);

});
