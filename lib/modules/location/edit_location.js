/**
 * Created by Nathaniel on 10/24/2016.
 */
var Location = require('../../models/locations.js');
var loc = new Location();
var ejs = require('ejs');
var fs = require('fs');
var init = function(session, settings){
    this.event = "edit_location";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.name) {
                loc.getByName(db, data.name, function(d){
                    if(d){
                        socket.emit('page_load', {wrapper: ".content", cover: "html", html: ejs.render(fs.readFileSync('views/location/edit.ejs', 'utf8'),{ location:d, settings:settings })});
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