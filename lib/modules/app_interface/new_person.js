/**
 * Created by Nathaniel on 10/29/2016.
 */
var People = require('../../models/people.js');
var people = new People();
var init = function(session, settings){
    this.events = [
        "app_new_person"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                if (db) {
                    people.getByName(db, data.name, function(data){
                        if(data){
                            socket.emit('new_person', {code: 0, sub: 2, uuid: session.id[socket.id]});
                        }else{
                            people.new(db, data.name, function(){
                                people.getByName(db, data.name, function(data) {
                                    if(data) {
                                        socket.emit('new_person', {code: 1, uuid: session.id[socket.id], id: data._id});
                                    }else{
                                        socket.emit('new_person', {code: 0, sub: 3, uuid: session.id[socket.id]});
                                    }
                                });
                            });
                        }
                    });
                } else {
                    socket.emit('new_person', {code: 0, sub: 1, uuid: session.id[socket.id]});
                }
            }
        }
    ];
}
module.exports=init;