var User = require('../../models/users.js');
var user = new User();
var init = function(session){
    this.event = "login_exec";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.user && data.pass) {
                user.getByUser(db, data.user, function(err, account){
                    if(account) {
                        socket.emit('login_status', {code: 1, ref: data.ref, account: data.user});
                    }else{
                        socket.emit('login_status', {code: 0, ref: data.ref});
                    }
                });
            } else {
                socket.emit('login_status', {code: 0, uuid: session.id[socket.id]});
            }
        }
    };
}
module.exports=init;