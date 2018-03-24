var express = require('express'),
 mongoose = require('mongoose'),
 reload = require('reload');

var app = express();
app.set('port', process.env.PORT || 3000);

// Routes
app.use(require('./routes/add-item-route'));
app.use(require('./routes/get-item-route'));
app.use(require('./routes/delete-item-route'));
app.use(require('./routes/search-route'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/twitter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected')
});

var server = app.listen(app.get('port'), function(){
    console.log("listening on port " + app.get('port'));
});

reload(app);
