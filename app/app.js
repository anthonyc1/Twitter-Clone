var express = require('express'),
 mongoose = require('mongoose'),
 reload = require('reload');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static('app/public'));

// Routes
app.use(require('./routes/index-route'));
app.use(require('./routes/milestone1'));

app.set('view engine', 'ejs');
app.set('views', 'app/views');

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
