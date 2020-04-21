let jsondata;
fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation').then(
    function(u){return u.json();}
).then(function(json){
    jsondata = json;

}
)





