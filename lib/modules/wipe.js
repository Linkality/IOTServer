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
                                description: "Presentation Schedule",
                                lat: "36.652527",
                                lng: "-121.797167",
                                beaconName:""
                            },
                            {
                                name:"Main Lobby",
                                imageUrl:"",
                                description: "If you need to take a phone call or a break from the action the main lobby is the best place to do so. We will be serving food and beverages throughout the day. We hope you have enjoyed your time at the 2016 Fall Computer Science Capstone Festival.",
                                lat: "36.652408",
                                lng: "-121.797283",
                                beaconName:""
                            },
                            {
                                name:"Room 110",
                                imageUrl:"",
                                description: "Poster Session",
                                lat: "36.652398",
                                lng: "-121.797431",
                                beaconName:""
                            },
                            {
                                name:"Room 105",
                                imageUrl:"",
                                description: "Poster Session",
                                lat: "36.652583",
                                lng: "-121.797331",
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
