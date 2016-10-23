#!/usr/bin/env node

/**
 * Module dependencies.
 */
var port = parseInt(process.env.PORT) | 8080;

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

var url = 'mongodb://'+process.env.mdb_user+':'+process.env.mdb_pass+'@'+process.env.mdb_host+'/'+process.env.mdb_db;
var mdb;
MongoClient.connect(url, function(err, db) {
    mdb = db;
});
var init = new Loader();
io.on('connection', function (socket) {
    init.generateSession(socket);
    init.exec(socket, mdb);
    socket.on('disconnect', function (c) {
        init.deleteSession(socket);
    });
});


server.listen(port); // start http server




