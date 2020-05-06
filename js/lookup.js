

// takes JSON object as argument and browses for requirements, eligibility and names, and returns them in an array
// OBSERVE: prerequisites does not mean REQUIREMENTS, only recommendations
// return example: ["name", ["course eligibilities"], ["course prerequisites"]]
function searching(data){ // Originally Erik/Celine
  var eligArray = [];
  var requiredCourse = "";
  var preqArray = [];
  var courseName;
  var finalResultArray = [];

  // this one finds the eligibility courses (REQUIRED COURSES)
  // can be found in the KOPPS API under PublicSyllabusVersions 0 (recent)
  if(data.publicSyllabusVersions[0].courseSyllabus.eligibility){
    requiredCourse = data.publicSyllabusVersions[0].courseSyllabus.eligibility;
    eligArray = requiredCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g)
    if (eligArray == null){
      eligArray = [];
    }
  }

  //this one finds the prerequisites (recommended courses)
  // can be found in the KOPPS API somewhere
  if(data.course.prerequisites){
    var recommendedCourse = data.course.prerequisites;
    //finds all coursecodes in the recommended courses string
    preqArray = recommendedCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g);//recs;
    if (preqArray == null){
      preqArray = [];
    }
  }

  courseName = new String(data.course.title);
  finalResultArray = [courseName, eligArray, preqArray];

  return finalResultArray;
}


//first function called, eitehr takes a course ID as argument or a course code
//1. input: a valid course ID     output: pass JSON object as an argument to searching(data) and returns the prerequisites of the input course
//2. input: a valid course name     output: generate relavant courses as buttons and write them onto the web blank page
//3. input: an invalid courseID/course name    output: lead you to course not found page
function lookup(courseIDorName){ // Originally Patrick/Jing group
  if (courseIDorName.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/gi)) { //If input is a courseID search directly and build the tree
    var jsonObject;
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.kth.se/api/kopps/v2/course/' + courseIDorName +  '/detailedinformation', false);  // `false` makes the request synchronous
    request.send(null)

    if (request.status === 200) {// That's HTTP for 'ok'
      jsonObject = JSON.parse(request.responseText);
        return searching(jsonObject);
    }
    else{
      window.location.href = "CourseNotFound.html";//if HTTP 404 then the there's not such api available for the given course, the course does not exist
    }
  }
  else { //If input is valid course-name create buttons for all related courses with that name, and show courseID on button
    var request = new XMLHttpRequest();
    request.open('GET', "https://api.kth.se/api/kopps/v2/courses/search?text_pattern=" + courseIDorName, false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {// That's HTTP for 'ok'
      jsonOBJ = JSON.parse(request.responseText);
      var temp;
      var courseArr = [];
      for(i=0; i<jsonOBJ.searchHits.length; i++){
        temp = jsonOBJ.searchHits[i].course;
        courseArr[i] = temp.courseCode;
      }
    }
    console.log(courseArr);
    document.write("Here are the courses that are relevant to your searching: ");
  //If there're relavant courses found, generate one button for each course code
    if(courseArr.length>0){
     for(i = 0; i < courseArr.length; i++){
      var path = "" + window.location.href;
      //console.log(path);
      url=[];
      url = path.split("=");
      url[1] = "=";
      url[2] = courseArr[i];
      finalUrl = url[0] + url[1] + url[2];
      //console.log(finalURL[0]+finalURL[1]+finalURL[2]);

      document.write('<a href = \"' +finalUrl + '\" ><button type="button">'  + courseArr[i] + '</button></a>');
      }
    }
    //if there is no such course, go to the Course Not Found Page
    else{
      window.location.href = "CourseNotFound.html";
    }
  }
}
