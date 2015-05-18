var express = require('express');
var fs = require('fs');
var path = require('path');
var basicAuth = require('basic-auth');
var bodyParser = require('body-parser');

var app = express();
var mongo = require('mongodb').MongoClient;

var db = undefined;
var quizSets = undefined;

var url = 'mongodb://localhost:27017/befuddled';
mongo.connect(url,function(err, con) {
  db = con;
  console.log("Connected to DB. error: " + err);
  db.collection('quizSets').find({},{"_id":0}).toArray(function(err,data){
    quizSets = data;
    console.log("Quiz sets loaded. error: " + err);
  });
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    req.quizSets = quizSets;
    next();
});

// Integrate body parser for post requests
app.use(bodyParser.json());

var auth = function (req, res, next) {
  function unauthorized(res) {
    return res.sendStatus(401);
  };

  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  req.user = user.name;

  var db = req.db;

  db.collection('users').find({"ino":user.name},{"password":1}).next(
    function(err, result){
    if(err || !result || result.password !== user.pass){
      return unauthorized(res);
    } else return next();
  });
};

app.get('/api/users/:ino', auth, function(req,res){
  //res.send('{"I_am_Groot":'+ req.params.ino +'}');
  if(req.user !== req.params.ino){
    res.sendStatus(401);
    return;
  }
  db.collection('users').find({"ino":req.user},{"password":0,"_id":0}).next(
    function(err, result){
    if(err || !result){
      return res.status(500).json(err);
    } else {
      result.testsAvailable = req.quizSets.map(function(quizSet){
        return {"name":quizSet.name,"id":quizSet.id,description:quizSet.description}
      });
      return res.status(200).json(result);
    }
  });
});

app.get('/api/quiz_sets/:set_no', auth, function(req,res){
  res.status(200).json(req.quizSets.filter(function(quizSet){
    return quizSet.id === req.params.set_no;
  })[0]);
});

app.post('/api/users', function(req, res){
  var db = req.db;

  db.collection('users').find({"ino":req.body.ino}).toArray(function(err, data){
    if(data.length){
      res.status(500).json({"err":"User Exists"});
    } else {
      req.body.testsTaken = [];
      db.collection('users').insert([req.body], function(err, result){
        if(err === null){
          req.body.testsAvailable = req.quizSets.map(function(quizSet){
            return {"name":quizSet.name,"id":quizSet.id}
          });
          res.json(req.body);
        } else {
          res.status(500).json(err);
        }
      });
    }
  });
});

app.post('/api/quiz_sets/:id',auth, function(req,res){
  var db = req.db;

  console.log(req.body)

  var set = req.quizSets.filter(function(quizSet){
    return quizSet.id === req.params.id;
  })[0];

  var score = 0;
  set.questions.forEach(function(qtn,i){
    if(qtn.correctAns === req.body.responses[i]){
      score+=qtn.points
    };
  },this);

  console.log(score)

  var ins = {id:req.body.id,
    responses:req.body.responses,
      takenOn:req.body.takenOn,
      scored:score}

  console.log(ins)

  db.collection('users').update({"ino":req.user},{$push:
    {testsTaken: ins }},function(err,result){
      res.sendStatus(200);
    })
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
