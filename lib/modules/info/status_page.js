/**
 * Created by Nathaniel on 10/28/2016.
 */
var ejs = require('ejs');
var fs = require('fs');
var init = function(session, settings){
    this.events = [
        "status_page"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                socket.emit('page_load', {wrapper: ".content", cover: "html", html: ejs.render(fs.readFileSync('views/status/status.ejs', 'utf8'),{settings:settings})});
            }
        }
    ];
}
module.exports=init;