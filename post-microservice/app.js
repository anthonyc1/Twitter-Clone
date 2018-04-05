var express = require('express'),
 mongoose = require('mongoose'),
 cookieParser = require('cookie-parser'),
 configVars = require('./config_vars');

var app = express();
app.set('port', process.env.PORT || 3001);
app.use(cookieParser())
app.set('configVars', configVars)
// Routes
app.use(require('./routes/add-item-route'));
app.use(require('./routes/get-item-route'));
app.use(require('./routes/delete-item-route'));
app.use(require('./routes/search-route'));

// Connect to MongoDB
mongoose.connect('mongodb://'+ configVars.mongodb_host +':'+ configVars.mongodb_port+ '/' + configVars.mongodb_db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected')
});

var server = app.listen(app.get('port'), function(){
    console.log("listening on port " + app.get('port'));
});
