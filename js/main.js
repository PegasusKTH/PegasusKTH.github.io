function searching(){
    var x = document.getElementById("coursecode").value;
    fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation')
    .then(res => res.json())
    .then(json => console.log(json));


    //MORE CODE
}
