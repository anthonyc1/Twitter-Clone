var nodemailer = require('nodemailer');
var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var transporter = nodemailer.createTransport('smtps://cse305project%40gmail.com:cse3052017@smtp.gmail.com');
var consumer = new Consumer(
    new kafka.KafkaClient({
        kafkaHost: "localhost:9092"
    }), [{
        topic: 'test',
        partition: 0
    }], {
        autoCommit: true
    }
);
consumer.on('message', function (message) {
    var data = JSON.parse(message.value);
    var mailOptions = {
        from: 'Pirates <cse305project@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: 'Verification', // Subject line
        html: '<a href="http://localhost:80/verify/' + data.email + '/' + data.key+ '"' + '>verify</a>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
});

consumer.on('error', function (error) {
    console.log(message);
});
