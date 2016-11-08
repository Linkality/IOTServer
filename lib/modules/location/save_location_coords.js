/**
 * Created by Nathaniel on 10/24/2016.
 */
var Location = require('../../models/locations.js');
var loc = new Location();
var init = function(session, settings){
    this.event = "save_location_coords";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.name && data.lat && data.lng) {
                loc.getByName(db, data.name, function(d){
                    if(d){
                        d.lng=data.lng;
                        d.lat=data.lat;
                        loc.saveByName(db, data.name, d, function(){
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