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
function addTags(){
    socket.emit('generate_secret');
}
function generateKey(func){
    call('generate_secret', {generate:true}, function(data){
        $("#inputSecret").val(data.string);
        $("#ffe").css({"backgroundColor":"#fff"});
        func();
    });
}
function readTag(){
    generateKey(function(){
        saveSecret();
    });
}
function saveSecret(){
    call('generate_secret', keyValue({reference:"#inputReference", name:"#inputSecret"}), function(data){
        if(data.code==0){
            $("#ffe").css({"backgroundColor":"#f00"});
        }else{
            $("#ffe").css({"backgroundColor":"#0f0"});
        }
    });
}