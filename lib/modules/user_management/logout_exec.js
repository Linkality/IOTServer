/**
 * Created by Nathaniel on 10/28/2016.
 */
var User = require('../../models/users.js');
var user = new User();
var init = function(session, settings){
    this.event = "logout_exec";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (session.account[socket.id]) {
                user.getById(db, session.account[socket.id], function(account){
                    delete session.account[socket.id];
                    socket.emit('response', {code: 1, ref: data.ref, account: account.user});
                });
            } else {
                socket.emit('response', {code: 0, ref: data.ref});
            }
        }
    };
}
module.exports=init;