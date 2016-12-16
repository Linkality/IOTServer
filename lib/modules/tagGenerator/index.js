/**
 * Created by Nathaniel on 10/24/2016.
 */
var ejs = require('ejs');
var fs = require('fs');
var SimpleName = require('../../models/SimpleName.js');
var simple = new SimpleName();
var init = function(session, settings){
    this.event = "generate_secret";

    var generateString = function(db, func){
        var s = ["blue", "green", "red", "yellow", "orange", "violet", "teal", "white", "brown", "cyan", "purple", "indigo", "scarlet"];
        var a =["giraffe", "anteater", "cat", "dog", "mouse", "pig", "bull", "fish", "fox", "bear", "lion", "wolf"];
        var unique = s[Math.floor(Math.random()*12)]+" "+a[Math.floor(Math.random()*11)];
        simple.getByCombinedName(db, unique, function(s){
            if(s==null){
                func(unique);
            }else{
                generateString(db, func);
            }
        })
    }
    this.class = function(socket, db){
        this.handle = function(data) {
        if(data && data.generate){
            generateString(db, function(string){
                socket.emit('response', {code: 1, string: string, ref: data.ref});
            });
        }else if (data && data.reference && data.name) {
                simple.getByCombinedName(db, data.name, function(d){
                    if(d==null){
                        simple.getByReference(db, data.reference, function(x) {
                            if(x==null){
                                simple.new(db, data.name, data.reference, function (obj) {
                                    socket.emit('response', {code: 1, ref: data.ref, obj: obj});
                                });
                            }else{
                                socket.emit('response', {code: 0, ref: data.ref});
                            }
                        });
                    }else{
                        socket.emit('response', {code: 0, ref: data.ref});
                    }
                });
            } else {
                socket.emit('page_load', {wrapper: ".content", cover: "html", html: ejs.render(fs.readFileSync('views/generated/index.ejs', 'utf8'),{settings:settings})});
            }
        }
    };
}
module.exports=init;