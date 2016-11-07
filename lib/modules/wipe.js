var ejs = require('ejs');
var fs = require('fs');
var Location = require('../models/locations.js');
var loc = new Location();
var User = require('../models/users.js');
var user = new User();
var init = function(session, settings){
    this.events = [
        "wipe"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                if(session.account[socket.id]) {
                    if(data.locations){
                        loc.wipe(db);
                    }
                    if(data.users){
                        user.wipe(db);
                    }
                }else{
                    socket.emit('redirect',{to: 'status_page'});
                }
            }
        }
    ];
}
module.exports=init;