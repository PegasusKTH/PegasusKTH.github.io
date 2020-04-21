<<<<<<< HEAD
let jsondata; //This is where the JSON object lies
fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation').then(
    function(u){return u.json();}
).then(function(json){
    jsondata = json;

=======
function searching(){
    var x = document.getElementById("coursecode").value;
    let jsondata;
    fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation').then(
        function(u){return u.json();}
    ).then(function(json){
        jsondata = json;
    })
>>>>>>> 8a7d2789f1b3336363acf67122c2cd80a3610480
}
