var kafka = require('kafka-node');
var configFile = require('../../config.json');
var Producer = kafka.Producer;

function sendEmail(email) {
    var producer = new Producer(new kafka.KafkaClient({
        kafkaHost: configFile.kafka_host + ":" + configFile.kafka_port
    }));
    var payloads = [{
        topic:configFile.kafka_email_topic,
        messages: email
    }];
    producer.on('ready', function() {
        producer.send(payloads, function(err, data) {
            console.log(data);
        });
    });
    producer.on('error', function(err) {
        console.log(err)
    });

}

module.exports = {
sendEmail
};
