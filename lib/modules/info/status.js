var init = function(session){
    this.events = [
        "status"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                if (db) {
                    socket.emit('status', {code: 1, uuid: session.id[socket.id]});
                } else {
                    socket.emit('status', {code: 0, uuid: session.id[socket.id]});
                }
            }
        }
    ];
}
module.exports=init;