/**
 * Created by Nathaniel on 10/24/2016.
 */
var Location = require('../../models/locations.js');
var loc = new Location();
var init = function(session, settings){
    this.event = "save_location";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.name_key) {
                loc.getByName(db, data.name_key, function(d){
                    if(d){
                        var keys = ["label", "name", "reference", "lat", "lng", "type"];
                        for(var i=0;i<keys.length;i++){
                            if(data[keys[i]] && data[keys[i]]!=d[keys[i]]){
                                d[keys[i]] = data[keys[i]];
                            }
                        }
                        loc.saveByName(db, data.name_key, d, function(){
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