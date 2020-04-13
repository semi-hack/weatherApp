// const weather = "/weather"

// const weatherForm = document.querySelector('form')


// weatherForm.addEventListner('submit', (event) => {
//     event.preventDefault();
// })

//signup
$(document).ready(function(){
    $( "#form1" ).submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/user',
            data: $('#form1').serialize(),
            dataType: "json",
            success: function(response){
                //alert("a");
                //console.log(response.Success);
                $('#form1')[0].reset();
                document.getElementById("check").innerHTML=response.Success;
                     //ADD THIS CODE
                     setTimeout(function(){
                         document.getElementById("check").innerHTML="";
                     },3000);
                     if (response.Success=="You are regestered,You can login now.") {
                         document.getElementById("aa").click();
                     };
                 },
                 error: function() {
                 }
             })
    });
});

//login
$(document).ready(function(){
    $( "#form" ).submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/user/Login',
            data: $('#form').serialize(),
            dataType: "json",
            success: function(response){
                //alert("a");
                //console.log(response.Success);
                $('#form')[0].reset();
                document.getElementById("check").innerHTML=response.Success;
                     //ADD THIS CODE
                     setTimeout(function(){
                         document.getElementById("check").innerHTML="";
                     },3000);
                     if (response.Success=="Success!") {
                         document.getElementById("aa").click();
                     };
                 },
                 error: function() {
                 }
             })
    });
});