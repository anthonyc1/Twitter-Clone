var nodemailer = require('nodemailer');
var kafka = require('kafka-node');
var configFile = require('./config_vars.json');
var Consumer = kafka.Consumer;
var transporter = nodemailer.createTransport('smtps://' + configFile.email + ':' + configFile.password + '@smtp.gmail.com');
var consumer = new Consumer(
    new kafka.KafkaClient({
        kafkaHost: configFile.kafka_host + ':' + configFile.kafka_port
    }), [{
        topic: configFile.kafka_email_topic,
        partition: 0
    }], {
        autoCommit: true
    }
);
consumer.on('message', function(message) {
    try {
        var data = JSON.parse(message.value);
        var mailOptions = {
            from: 'Pirates <cse305project@gmail.com>', // sender address
            to: data.email, // list of receivers
            subject: 'Verification', // Subject line
            text: 'validation key: <Ki27eSCM8B' + data.key + '>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(info);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

consumer.on('error', function(error) {
    console.log(error);
});
