async function searching() {
  var requiredCourse = [];
  var recommendedCourse = [];
  let jsondata;
  var recommendedCoursesArray = [];
  var requiredCoursesArray = [];

  try {
    /*fetch the json file from the yrl of the course code*/
    var x = document.getElementById("coursecode").value;

    let response =  await fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation').then(
      function(u){
        return u.json();}
    ).then(function(json) {
    //turns json into a workable object
      jsondata = json;
      var jsonOBJ = jsondata;

      //adds data from the place required courses can be found to string
      if(jsonOBJ.publicSyllabusVersions[0].courseSyllabus.eligibility){
          var requiredCourse = jsonOBJ.publicSyllabusVersions[0].courseSyllabus.eligibility;
          //finds all coursecodes in the required courses string
          var reqArray = new Array(requiredCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g)); //reqs;
          if(reqArray.length > 0) {
            for (i = 0; i < reqArray.length; i++) {
              requiredCoursesArray.push((reqArray[i]));
            }
          }
      }
      //adds data from the place recommended courses can be found to string
      if(jsonOBJ.course.prerequisites){
          var recommendedCourse = jsonOBJ.course.prerequisites;
          //finds all coursecodes in the recommended courses string
          var recArr = new Array(recommendedCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g));//recs;
          if(recArr.length > 0) {
            for (i = 0; i < recArr.length; i++) {
              recommendedCoursesArray.push((recArr[i]));
            }
          }
      }


      var i;
    /*pushing name of the course searched for, so that the index 0 of courses
    array always contains the name of the searched course, and the rest is two
    arrays with required and recommended courses*/
            var namn = new String(jsonOBJ.course.title);
                // recommendedCoursesArray.push(namn);
            //console.log([namn , requiredCoursesArray, recommendedCoursesArray]);
            // rett = [namn , requiredCoursesArray, recommendedCoursesArray];
            return [namn , requiredCoursesArray, recommendedCoursesArray];

     }


     ).catch(function(){
       console.log("klar")
       return([]);})
      }
  catch(err) {
    return([]);
    // document.getElementById("demo").innerHTML = err.message;
  }
}
// async function searching(){
 let y = searching();
 console.log(y);
// }




// $.getJSON( "test.js", function( json ) {
//   console.log( "JSON Data: " + json.users[ 3 ].name );
//  });


//  $.getJSON( "test.js", { name: "John", time: "2pm" } )
//    .done(function( json ) {
//      console.log( "JSON Data: " + json.users[ 3 ].name );
//    })
//    .fail(function( jqxhr, textStatus, error ) {
//      var err = textStatus + ", " + error;
//      console.log( "Request Failed: " + err );
//  });





// $.getJSON( "ajax/test.json", function( data ) {
//   var items = [];
//   $.each( data, function( key, val ) {
//     items.push( "<li id='" + key + "'>" + val + "</li>" );
//   });
//
//   $( "<ul/>", {
//     "class": "my-new-list",
//     html: items.join( "" )
//   }).appendTo( "body" );
// });



// $.getJSON('lessons.js', handleDatas)
// // This function will be executed when the datas come back
// function handleDatas(data) {
//     // use the `data` variable here
// }
//
//
//
// $.getJSON('lessons.js', function(data) {
//     // use the `data` variable here
// }

//
//
// (function() {
//
//    var x = document.getElementById("coursecode").value;
//   $.getJSON('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation')
//     .done(function( data ) {
//       $.each( data.items, function( i, item ) {
//         $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
//         if ( i === 3 ) {
//           return false;
//         }
//       });
//     });
// })();







//THIS IS WHERE THE OLD CODE BEGINS
//THIS IS WHERE THE OLD CODE BEGINS
//THIS IS WHERE THE OLD CODE BEGINS

//( ͡° ͜ʖ ͡°)
// //(  ͡°  ͜ ʖ  ͡° ) w i d e  l e n n y  i s  h e r e
// //(   ͡°    ͜ ʖ    ͡°  )  f  e  e  l   n  o   f  e  a  r   m  y   c  h  i  l  d
// function searching() {
//   var requiredCourse = [];
//   var recommendedCourse = [];
//   let jsondata;
//   var recommendedCoursesArray = [];
//   var requiredCoursesArray = [];
//
//     var x = document.getElementById("coursecode").value;
//
//     async function getJsonAsync(x) {
//       let u = await fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation');
//       let jsondata = await u.json();
//       return jsondata;
//       //var jsonOBJ = jsondata;
//       //return jsonOBJ;
//     }
//
//     getJsonAsync('x')
//     .then(
//         //jsonOBJ => console.log(jsonOBJ)
//         console.log("whatever")
//     );
//
// }

    //
    // var x = document.getElementById("coursecode").value;
    // /*fetch the json file from the yrl of the course code*/
    // fetch('https://api.kth.se/api/kopps/v2/course/'+ x +'/detailedinformation').then(
    //   function(u){
    //     return u.json();}
    // ).then(function(json) {
    // //turns json into a workable object
    //   jsondata = json;
    //   var jsonOBJ = jsondata;
    //
    //   //adds data from the place required courses can be found to string
    //   if(jsonOBJ.publicSyllabusVersions[0].courseSyllabus.eligibility){
    //       var requiredCourse = jsonOBJ.publicSyllabusVersions[0].courseSyllabus.eligibility;
    //       //finds all coursecodes in the required courses string
    //       var reqArray = new Array(requiredCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g)); //reqs;
    //       if(reqArray.length > 0) {
    //         for (i = 0; i < reqArray.length; i++) {
    //           requiredCoursesArray.push((reqArray[i]));
    //         }
    //       }
    //   }
    //   //adds data from the place recommended courses can be found to string
    //   if(jsonOBJ.course.prerequisites){
    //       var recommendedCourse = jsonOBJ.course.prerequisites;
    //       //finds all coursecodes in the recommended courses string
    //       var recArr = new Array(recommendedCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g));//recs;
    //       if(recArr.length > 0) {
    //         for (i = 0; i < recArr.length; i++) {
    //           recommendedCoursesArray.push((recArr[i]));
    //         }
    //       }
    //   }
    //
    //
    //   var i;
    // /*pushing name of the course searched for, so that the index 0 of courses
    // array always contains the name of the searched course, and the rest is two
    // arrays with required and recommended courses*/
    //         var name = new String(jsonOBJ.course.title);
    //             // recommendedCoursesArray.push(name);
    //         console.log([name , requiredCoursesArray, recommendedCoursesArray]);
    //
    //         return [name , requiredCoursesArray, recommendedCoursesArray];
    //
    //  }
    //

    // ).catch(function(){
    //   console.log("klar")
    //   return([]);})
  //     }
  // catch(err) {
  //   return([]);
  //   // document.getElementById("demo").innerHTML = err.message;
  // }
