/**
 * Created by Nathaniel on 10/24/2016.
 */
var Location = require('../../models/Location.js');
var loc = new Location();
var init = function(session, settings){
    this.event = "delete_location";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.name_key) {
                loc.getByName(db, data.name_key, function(d){
                    if(d){
                        loc.delete(db, data.name_key, function(){
                            socket.emit('response', {code: 1, ref: data.ref});
                        });
                    }else{
                        socket.emit('response', {code: 0, ref: data.ref});
                    }
                });
            } else {
                socket.emit('response', {code: 0, ref: data.ref});
            }
        }
    };
}
module.exports=init;