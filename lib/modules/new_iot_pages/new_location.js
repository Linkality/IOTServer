/**
 * Created by Nathaniel on 10/24/2016.
 */
var Location = require('../../models/Location.js');
var loc = new Location();
var init = function(session, settings){
    this.event = "new_location";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.label && data.name && data.reference && data.lat && data.lng, data.type) {
                loc.getByName(db, data.name, function(d){
                    if(d==null){
                        loc.new(db, data.label, data.name, data.reference, data.lat, data.lng, data.type,function(obj){
                            socket.emit('response', {code: 1, ref: data.ref, object: obj});
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