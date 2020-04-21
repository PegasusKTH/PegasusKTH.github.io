function searching(){
    var x = document.getElementById("coursecode").value;
    let jsondata;
    fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation').then(
        function(u){return u.json();}
    ).then(function(json){
        jsondata = json;
    })
}
