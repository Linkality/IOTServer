/**
 * Created by Nathaniel on 12/08/2016.
 */
 var SimpleName = require('../../models/SimpleName.js');
 var simpleName = new SimpleName();
  var History = require('../../models/History.js');
  var history = new History();
 var init = function(session, settings){
     this.events = [
         "app_friend_location"
     ];
     this.classes = [
         function(socket, db){ // sending status of mongodb
             this.handle = function(data) {
                 if (db) {
                     simpleName.getByName(db, data.name.toLowerCase(), function(simple){
                         if(!simple){
                             socket.emit('friend_location', { code: 0 });
                         }else{
                             history.getByPerson(db, simple['reference'], function(historyData){
                                 if(historyData) {
                                     socket.emit('friend_location', {code: 1, latest: historyData});
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