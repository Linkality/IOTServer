#!/usr/bin/env node

/**
 * Module dependencies.
 */
var port = parseInt(process.env.PORT) | 8080;
var util = require('util');
var app = require('../app');
app.set('port', port);
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var server = http.createServer(app);
var io = require('socket.io')(server);
var Loader = require('../lib/loader.js');
if(process.env.mdb_user==null){
    process.env.mdb_user="iotconn";
    process.env.mdb_pass="iotconn";
    process.env.mdb_host="olympia.modulusmongo.net:27017";
    process.env.mdb_db="xuDihy4d";
}
var eventRegistration = {
    onLocation:{

    }
};


var url = 'mongodb://'+process.env.mdb_user+':'+process.env.mdb_pass+'@'+process.env.mdb_host+'/'+process.env.mdb_db;
var mdb;
MongoClient.connect(url, function(err, db) {
    mdb = db;
});
var init = new Loader();

init.addSetting("title", "Linkality");
io.on('connection', function (socket) {
    init.generateSession(socket);
    init.exec(socket, mdb);
    socket.on('disconnect', function (c) {
        init.deleteSession(socket);
    });
});
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

var buffer = new Buffer(util.format("%s:%s", 'nathaniel.davidson@gmail.com/progressfollowers', 'Nat15678!'));

var auth = util.format("Basic %s", buffer.toString('base64'));
var uri = util.format("wss://dap.amtech.mx/amtech/push/notifications");

// amtech websocket Initializization.
client.connect(uri, null, null, {
    "Authorization" : auth
});
var History = require("../lib/models/History.js");
var history = new History();
var Location = require("../lib/models/Location.js");
var location = new Location();

client.on('connect', function(connection) {
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('message', function(message) {
        console.log(message);
        if (message.type === 'utf8') {
            var data = message.utf8Data;
            var json = JSON.parse(data);
            var antenna = json.body.match(/From (.*?) -/i)[1];
            var tagId = json.body.match(/epcString: (.*?) -/i)[1];
            location.getByReference(mdb, antenna, function(loc){
                if(loc) {
                    console.log(loc);
                    history.new(mdb, loc['_id'], tagId, function (d) {
                        console.log(d);
                    });
                }else{
                    console.log("Antenna not found! "+antenna);
                }
            });
        }
    });

    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
});
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});


server.listen(port); // start http server




