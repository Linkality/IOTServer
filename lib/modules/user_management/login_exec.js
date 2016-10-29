var User = require('../../models/users.js');
var user = new User();
var init = function(session, settings){
    this.event = "login_exec";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.user && data.pass) {
                user.getByUser(db, data.user, function(account){
                    if(account && user.password(data.pass)==account.pass) {
                        session.account[socket.id]=account._id;
                        socket.emit('response', {code: 1, ref: data.ref, account: data.user});
                    }else{
                        socket.emit('response', {code: 0, ref: data.ref});
                    }
                });
            } else {
                socket.emit('response', {code: 0, ref: data.ref});
            }
        }
    };
}
module.exports=init;