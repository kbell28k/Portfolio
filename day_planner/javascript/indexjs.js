$(document).ready(function(){
var plan = {}   /// key is going to be the hour and the value is going to be the task

    // on click save we need to save the info and update the localstorage
$(".saveBtn").on("click",function(){
    //  what was clicked 
    var hour = $(this).attr("id")
    var input = $(this).siblings(".input-area").val()
    console.log(hour, input)
    plan[hour]= input
    console.log(plan)
    localStorage.setItem("plan", JSON.stringify(plan))

})


    // every time we open the web we need to verify if we have localstorage and show the info

function showInfo(){
    plan = JSON.parse(localStorage.getItem("plan")) 
    if (!plan){
        plan={} //the system doesn't read == undefined
    }



    for (key in plan){
        console.log(plan[key])
        $("#" + key).siblings(".input-area").val(plan[key])

    }


}


    // change the backgorupd base on the current time
function updateColor(){
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    var current = moment().hours()  // hour of the current in 24 hours format

    $(".input-area").each(function(){
        var hour = parseInt($(this).siblings(".saveBtn").attr("id"))
        console.log("hour update", hour)

        if (hour < current){
            $(this).addClass("past")
        }
        else if (hour === current){
            $(this).removeClass("past")
            $(this).addClass("present")
        }
        else{
            $(this).removeClass("past")
            $(this).removeClass("present")
            $(this).addClass("future")
        }

    })

}



showInfo()
updateColor()

var interval = setInterval(updateColor, 15000)



})