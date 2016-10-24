var ejs = require('ejs');
var fs = require('fs');
var init = function(session, settings){
    this.event = "login_box";
    this.class = function(socket, db){
        this.handle = function(data) {
            if (session.account[socket.id]) {
                socket.emit('login_status', {code: 1});
            } else {
                socket.emit('page_load', {wrapper: ".content", cover: "html", html: ejs.render(fs.readFileSync('views/login/box.ejs', 'utf8'),{settings:settings})});
            }
        }
    };
}
module.exports=init;