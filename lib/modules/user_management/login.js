var init = function(session){
    this.event = "login";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (data && data.user && data.pass) {
                socket.emit('login', {code: 1, uuid: session.id[socket.id], account: data.user});
            } else {
                socket.emit('login', {code: 0, uuid: session.id[socket.id]});
            }
        }
    };
}
module.exports=init;