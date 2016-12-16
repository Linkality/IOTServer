/**
 * Created by Nathaniel on 12/08/2016.
 */
 var SimpleName = require('../../models/SimpleName.js');
 var simpleName = new SimpleName();
 var History = require('../../models/History.js');
 var history = new History();
 var Location = require("../../models/Location.js");
 var location = new Location();
 var init = function(session, settings){
     this.events = [
         "app_friend_location"
     ];
     this.classes = [
         function(socket, db){ // sending status of mongodb
             this.handle = function(data) {
                 if (db) {
                     console.log(data);
                     simpleName.getByName(db, data.simple, function(simple){
                         console.log(simple);
                         if(!simple){
                             socket.emit('friend_location', { code: 0 });
                         }else{
                             history.getByPersonLatest(db, simple['reference'], function(historyData){
                                 console.log(historyData);
                                 if(historyData['location']) {
                                     location.getById(db, historyData['location'], function(locationInfo){
                                         console.log(locationInfo);
                                         socket.emit('friend_location', {
                                             code: 1,
                                             location: locationInfo,
                                             history: historyData,
                                             simple: simple
                                         });
                                     });
                                 }else{
                                     socket.emit('friend_location', {code: 0});
                                 }
                             });
                         }
                     });
                 } else {
                     socket.emit('friend_location', {code: 0});
                 }
             }
         }
     ];
 }
 module.exports=init;