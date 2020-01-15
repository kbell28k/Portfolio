function makeid(){
var IdLength=document.getElementById('IdLength');
//Strip anything but 0 to 9
var UserInput=IdLength.value.replace(/[^0-9.]/g, "");
//Update input value
IdLength.value=UserInput;
var Results=document.getElementById('results');
var text = "";
var shuffle = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//Is input is empty?
if(IdLength!==''){
	for( var i=0; i < IdLength.value; i++ ){
    	text += shuffle.charAt(Math.floor(Math.random() * shuffle.length));
    }
    Results.innerHTML=text;
}
}