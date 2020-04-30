function searching(){
  var requiredCourse;
  var recommendedCourse;
  let jsondata;
  var recommendedCoursesArray = [];
  var requiredCoursesArray = [];
  var eligability = new Boolean(false);
  var prerequisites = new Boolean(false);

/*Parses the jsonfile as an object, looking for the course codes related to our
  flags eligibility and prerequisites*/
  try {

     var x = document.getElementById("coursecode").value;
     /*fetch the json file from the url of the course code*/
     fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation')
     .then(
        function(u) {
         return u.json();
       }
     ).then(
        function(json) {
     //turns json into a workable object
       jsondata = json;
       var jsonOBJ = JSON.parse(jsondata);
       console.log(jsonOBJ);
       }
    )



  }
  catch(error) {
    console.error(error);
  }
}
