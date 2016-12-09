/**
 * Created by nathanieldavidson on 12/7/16.
 */
var Room = require('../../models/Room.js');
var room = new Room();
var init = function(session, settings){
    this.events = [
        "app_room_list"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data){
                if (db) {
                    room.getAll(db, function(roomData){
                        socket.emit('room_list', {rooms:roomData});
                    });
                } else {
                    socket.emit('room_list', {code: 0});
                }
            }
        }
    ];
}
module.exports=init;