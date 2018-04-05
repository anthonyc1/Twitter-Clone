var express = require('express');
var cookieParser = require('cookie-parser');
var reload = require('reload');
var configFile = require('../config_vars.json');

var app = express();
app.use(cookieParser())
app.use(express.static('app/public'));
app.set('port', process.env.PORT || 3005);
app.set('appConfig', configFile);
app.use(require('./routes/index-route'));
app.set('view engine', 'ejs');
app.set('views', 'app/views');

var server = app.listen(app.get('port'), function() {
    console.log("listening on port " + app.get('port'));
});

reload(app);
