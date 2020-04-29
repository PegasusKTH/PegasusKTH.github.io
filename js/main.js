function searching(){
    var x = document.getElementById("coursecode").value;

    var obj;

    fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation')
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => console.log(obj));


    //MORE CODE
}
