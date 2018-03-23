var express = require('express');
var Sequelize = require("sequelize");
var configFile = require('./config.json');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var userService = require('./mysql/services/userService');


var app = module.exports = express();
app.use(cookieParser())
app.set('port', process.env.PORT || 3000);
app.set('appConfig', configFile);
app.use(require('./routes/create-account-route'));
app.use(require('./routes/login-route'));

//mysql database
var sequelize = new Sequelize({
    host: configFile.mysql_host,
    port: configFile.mysql_port,
    database: configFile.mysql_database,
    dialect: configFile.mysql_dialect,
    username: configFile.mysql_username,
    password: configFile.mysql_password
});
//connect to mysql database and create table users if one does not exist
sequelize.authenticate().then(()=>{
    console.log("connected to mysql");
    userService(sequelize);
}).catch((err) =>{
    console.log(err);
    process.exit(1);
});

app.set('sequelize', sequelize);


var server = app.listen(app.get('port'), function() {
    console.log("listening on port " + app.get('port'));
});
