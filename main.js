//( ͡° ͜ʖ ͡°)
//(  ͡°  ͜ ʖ  ͡° ) w i d e  l e n n y  i s  h e r e  t o  t e s t  i f  c e l i n e  c a n  g i t
//(° ͜ʖ°) she could

// var val;
//
// async function startSearching(x) {
//   var requiredCourse = [];
//   var recommendedCourse = [];
//   let jsondata;
//   var recommendedCoursesArray = [];
//   var requiredCoursesArray = [];
//
//   if (x == "done") {
//     return
//   }
//
//   $.getJSON('https://youshook.me/files/test.json', function(data) {
//
//     val = data; // store in the variable
//     doTheThing();
//
//   });
//
//   return val;
// }
//
// function doTheThing() {
//   console.log("look it's done");
//
//   searching("done");
//
// }
//
// function recieve() {
//
// }

//( ͡° ͜ʖ ͡°)
//(  ͡°  ͜ ʖ  ͡° ) w i d e  l e n n y  i s  h e r e  t o  t e s t  i f  c e l i n e  c a n  g i t
//(° ͜ʖ°) she could

var allPraiseTheArrGods = [];
var instanceCounter = 1;
var closedInstanceCounter = 0;

var firstCode = null;
var doneTheThing = false;

function runDemo() {
  searching("ii1305");
}


function searching(x) {

  if (firstCode == null) {
    firstCode = x;
  }


  var requiredCourse = [];
  var recommendedCourse = [];
  let jsondata;
  var recommendedCoursesArray = [];
  var requiredCoursesArray = [];

  try {

    // var x = document.getElementById("coursecode").value;
    /*fetch the json file from the yrl of the course code*/
    fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation').then(
      function(u){
        return u.json();}
    ).then(function(json) {
    //turns json into a workable object
      jsondata = json;
      var jsonOBJ = jsondata;

      console.log("get json feature");
      console.log(jsonOBJ);


      //adds data from the place required courses can be found to string
      if(jsonOBJ.publicSyllabusVersions[0].courseSyllabus.eligibility){
          var requiredCourse = jsonOBJ.publicSyllabusVersions[0].courseSyllabus.eligibility;
          //finds all coursecodes in the required courses string
          var reqArray = new Array(requiredCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g)); //reqs;

      }
            console.log("json parsing feature");

            console.log("requirements for " + x);
            console.log(reqArray[0]);


            // console.log(allPraiseTheArrGods);
            // console.log(allPraiseTheArrGods.length);
            allPraiseTheArrGods.push(["courseCode", x, "prerequisites", reqArray[0]]);
            // console.log(reqArray[0]);
            // for (var i = 0; i < reqArray[0].length; i++) {
            //   searching(reqArray[0][i]);
            //   instanceCounter++;
            //   // console.log(reqArray[0][i]);
            // }

     }

    ).catch(function(){
      // console.log("klar")
      allPraiseTheArrGods.push(["courseCode", x, "prerequisites", []]);}).then( postAsyncCall() )
      closedInstanceCounter++;

      }
  catch(err) {
    return([]);
    // document.getElementById("demo").innerHTML = err.message;
  }
}

function postAsyncCall() {
  if (instanceCounter == closedInstanceCounter && doneTheThing == false) {
    doneTheThing = true;

    // console.log("done ");
    // console.log(allPraiseTheArrGods.length);
    // console.log(allPraiseTheArrGods);





    // chopTreeInverse(allPraiseTheArrGods);
  }
}





















//
