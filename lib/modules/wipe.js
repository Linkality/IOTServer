var ejs = require('ejs');
var fs = require('fs');
var Location = require('../models/Location.js');
var loc = new Location();
var User = require('../models/User.js');
var user = new User();
var Person = require('../models/Person.js');
var person = new Person();
var Room = require('../models/Room.js');
var room = new Room();
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
                    if(data.persons){
                        person.wipe(db);
                    }
                    if(data.rooms){
                        room.generateRooms(db,[
                            {
                                name:"Room 104",
                                imageUrl:"",
                                lng: "36.652527",
                                lat: "-121.767167",
                                beaconName:""
                            },
                            {
                                name:"Main Lobby",
                                imageUrl:"",
                                lng: "",
                                lat: "",
                                beaconName:""
                            },
                            {
                                name:"Room 110",
                                imageUrl:"",
                                lng: "",
                                lat: "",
                                beaconName:""
                            },
                            {
                                name:"Room 105",
                                imageUrl:"",
                                lng: "",
                                lat: "",
                                beaconName:""
                            },
                        ])
                    }
                }else{
                    socket.emit('redirect',{to: 'status_page'});
                }
            }
        }
    ];
}
module.exports=init;