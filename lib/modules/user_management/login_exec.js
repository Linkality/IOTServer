var init = function(session){
    this.event = "login_exec";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.user && data.pass) {
                socket.emit('login_status', {code: 1, uuid: session.id[socket.id], account: data.user});
            } else {
                socket.emit('login_status', {code: 0, uuid: session.id[socket.id]});
            }
        }
    };
}
module.exports=init;