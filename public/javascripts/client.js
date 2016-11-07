/**
 * Created by Nathaniel on 10/28/2016.
 */
function makeid(){
    var text = "";
    var possible = 'aA0';
    for( var i=0; i <10; i++ ) {
        var rand = Math.random();
        var chars = Math.floor(rand*3);
        text += String.fromCharCode(possible.charCodeAt(chars) + Math.floor(rand* ((chars==2)?10:26)));
    }
    return text;
}
var callbacks = {
    func:[]
};
function call(event, data, func){
    var refId = makeid();
    callbacks.func[refId] = func;
    data.ref = refId;
    socket.emit(event, data);
}
function showLoader(){
    $('.loader').show();
}
function hideLoader(){
    $('.loader').hide();
}
function keyValue(data){
    var obj = {};
    $.each(data, function(k,v){
        obj[k]=$(v).val();
    });
    return obj;
}