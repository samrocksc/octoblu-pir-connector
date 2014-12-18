//Declare skynet and johnny-five
var five = require('johnny-five');
var skynet = require('meshblu');

//Fixing Date
var currentTime = new Date()
var month = currentTime.getMonth() + 1
var day = currentTime.getDate()
var year = currentTime.getFullYear()
var currentDate = (month + "-" + day + "-" + year)

// Not specifying a UUID/Token auto-registers a new device
var conn = skynet.createConnection({
    "server": "meshblu.octoblu.com",
    "port": 80
});

conn.on('notReady', function(data) {
    console.log('UUID FAILED AUTHENTICATION!');
    console.log(data);
});

conn.on('ready', function(data) {

    console.log("Connected to Meshblu");
    conn.on('message', function(databits) {

        //declaring the johnny-five connection
        var board = new five.board();
        board.on("ready", function() {

            //creating 2 new hardware instances for each sensor
            //first sensor
            sensor1 = new five.Sensor({
                pin: "A0",
                freq: 2000
            });
            sensor2 = new five.Sensor({
                pin: "A1",
                freq: 2000
            });
            //doing the work for sensor A0 to scale and give report about movement
            sensor1.scale([0, 10]).on("data"),
            function() {
                if (this.value > 0) {
                    conn.on('message'),
                    function(data) {
                        console.log('motion detected on A0', data);
                    }
                } else {
                    console.log('no motion detected on A0');
                };
            };
            //doing the work for sensor A1 to scale and give a report about movement
            sensor2.scale([0, 10]).on("data"),
            function() {
                if (this.value > 0) {
                    conn.on('message'),
                    function(data) {
                        console.log('motion detected on A1', data);
                    }
                } else {
                    console.log('no motion detected on A1')
                };
            };
        })


    });
});