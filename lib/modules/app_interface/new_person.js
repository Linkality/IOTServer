/**
 * Created by Nathaniel on 10/29/2016.
 */
var Person = require('../../models/Person.js');
var person = new Person();
var uuidV4 = require('uuid/v4');
var init = function(session, settings){
    this.events = [
        "app_new_person"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                if (db) {
                    person.getByName(db, data.name.toLowerCase(), function(dater){
                        if(dater){
                            socket.emit('new_person', {code: 0, id:dater['_id'],  sub: 2, reference: dater['reference'], uuid: session.id[socket.id]});
                        }else{
                            person.new(db, data.name.toLowerCase(), uuidV4(), function(dater){
                                if(dater) {
                                    socket.emit('new_person', {code: 1, uuid: session.id[socket.id], reference: dater['reference'], id: dater['_id']});
                                }else{
                                    socket.emit('new_person', {code: 0, sub: 3, uuid: session.id[socket.id]});
                                }
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