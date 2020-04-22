



function getName(x){

  let jsondata;
  // var courses = []
    try{
    var x = document.getElementById("coursecode").value;

    fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation').then(
      function(u){return u.json();}
    ).then(function(json) {

    jsondata = json;
    var jsonOBJ = jsondata
    return(jsonOBJ.course.supplementaryInfo.title);

}
}
catch(err) {
  document.write("HIII");
  // document.getElementById("demo").innerHTML = err.message;
  }
}
