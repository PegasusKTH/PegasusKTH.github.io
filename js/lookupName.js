//input: a course name string
//output: related courses in an array

function lookupName(courseName) {
  var request = new XMLHttpRequest();
  request.open('GET', "https://api.kth.se/api/kopps/v2/courses/search?text_pattern=" + courseName, false);  // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {// That's HTTP for 'ok'
   jsonOBJ = JSON.parse(request.responseText);
  var temp;
  var courseArr = [];
  for(i=0; i<jsonOBJ.searchHits.length; i++){
      temp = jsonOBJ.searchHits[i].course;
      courseArr[i] = temp.courseCode;
  }
  //console.log(courseArr);
  return courseArr;
  }
}


//input: array of course code
//output: generate one button for each course code
function buttonGenerator(courseArr){
  for(i = 0; i < courseArr.length; i++){
    document.write('<button type="button" onclick="call funcktion">'  + courseArr[i] + '</button>'); //replace “call function” with proper function that will generate a tree with the given course code

  }
}
