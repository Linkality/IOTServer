/**
 * Created by Nathaniel on 10/24/2016.
 */
var User = require('../../models/users.js');
var user = new User();
var init = function(session){
    this.event = "register_exec";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.user && data.pass) {
                user.getByUser(db, data.user, function(account){
                    if(account) {
                        socket.emit('response', {code: 0, ref: data.ref});
                    }else{
                        user.new(db, data.user, data.pass,function(){
                            socket.emit('response', {code: 1, ref: data.ref, account: data.user});
                        })
                    }
                });
            } else {
                socket.emit('response', {code: 0, ref: data.ref});
            }
        }
    };
}
module.exports=init;