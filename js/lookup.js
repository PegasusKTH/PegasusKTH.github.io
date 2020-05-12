

// takes JSON object as argument and browses for requirements, eligibility and names, and returns them in an array
// OBSERVE: prerequisites does not mean REQUIREMENTS, only recommendations
// return example: ["name", ["course eligibilities"], ["course prerequisites"], "hp", ["periods"]]
function searching(data){ // Originally Erik/Celine
  var eligArray = [];
  var requiredCourse = "";
  var preqArray = [];
  var courseName;
  var finalResultArray = [];
  var hp = null;
  var periodArray = [];
  var courseInPeriod = [false, false, false, false];
   //represents which period is available in, if true then the course is given in that period of the (index+1) in the array. Ex. [false, false, true, false] gives course in p3.


   if(data.publicSyllabusVersions.length > 0 ){
     if(data.publicSyllabusVersions[0].courseSyllabus.eligibility){

       var equivalentResult = getEquivalents(data.publicSyllabusVersions[0].courseSyllabus.eligibility); // getEquivalents returns [equivalents, manipulatedDataString] see function docs for more details

       for(var i = 0; i < equivalentResult[0].length; i++) {
         eligArray.push(equivalentResult[0][i]);
       }
       // writes over data string with manipulated datastring to prevent duplicates
       data.publicSyllabusVersions[0].courseSyllabus.eligibility = equivalentResult[1];
       // this one finds the eligibility courses (REQUIRED COURSES)
       // can be found in the KOPPS API under PublicSyllabusVersions 0 (recent)
       requiredCourse = data.publicSyllabusVersions[0].courseSyllabus.eligibility;
       eligArray = eligArray.concat(requiredCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g));
       if (eligArray == null){
         eligArray = [];
       }
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
  //find hp
  if(data.course.credits){
    hp = data.course.credits + " hp";
  }

  //find period in format "PX (xx hp)"
  if(data.roundInfos[0]){
    var place = 0;

    for(var i = 0; i < data.roundInfos.length; i++){
      var s = data.roundInfos[i].round.courseRoundTerms[0].formattedPeriodsAndCredits; //potential bug if courseroundTerms[0] has more indexes and it does NOT mean version of course
      courseInPeriod[s[1]-1] = true;

    }

    for(var i = 0; i < courseInPeriod.length; i++){
      if(courseInPeriod[i] == true){
        periodArray.push("P"+ (i+1))
      }

    }
  }

  courseName = new String(data.course.title);
  finalResultArray = [courseName, eligArray, preqArray, hp, periodArray.join(", ")];

  return finalResultArray;
}

// first function called, eitehr takes a course ID as argument or a course code or a course name
//1. input: a valid course ID     output: pass JSON object as an argument to searching(data) and returns the prerequisites of the input course
//2. input: a valid course name     output: generate relavant courses as buttons and write them onto the web blank page
//3. input: an invalid courseID/course name    output: lead you to course not found page
function lookup(courseIDorName){ // Originally Patrick/Jing group

  if (courseIDorName.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/gi) || courseIDorName.match(/[A-Z][A-Z][A-Z][0-9][0-9][0-9][0-9]/gi)  || courseIDorName.match(/[A-Z][A-Z][0-9][0-9][0-9][A-Z]/gi)) { //If input is a courseID search directly and build the tree
    var jsonObject;
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.kth.se/api/kopps/v2/course/' + courseIDorName +  '/detailedinformation', false);  // `false` makes the request synchronous
    request.send(null);

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
      var courseNames = [];

      for(i=0; i<jsonOBJ.searchHits.length; i++){
        temp = jsonOBJ.searchHits[i].course;
        courseArr[i] = temp.courseCode;
        courseNames[i] = temp.title;
      }
    }
   //If there're relavant courses found, generate one button for each course code
    if(courseArr.length>0){
     for(i = 0; i < courseArr.length; i++){
      var path = "" + window.location.href;
      url=[];
      url = path.split("=");
      url[1] = "=";
      url[2] = courseArr[i];

      document.write('<a class="searchLink"  href = \"' + "graph.html?courseCode=" + courseArr[i] + '\" >'  + courseArr[i] + " - " +  courseNames[i] + '</a><br>');
      }
    }
    //if there is no such course, go to the Course Not Found Page
    else{
      window.location.href = "CourseNotFound.html";
    }
  }
}


/*
Get Equivalents
DESC:
Looks for certain patterns in a string, corresponding to KoppsAPI course-formatting,
to look for required courses equivalent to eachother. Returns these equivalent courses
and the taken input but with the equivalent courses removed. Modified datastring can
be used to look for courses which lack equivalents.

INPUT:
string of data from API json file.
json object expected is "data.publicSyllabusVersions[0].courseSyllabus.eligibility"

OUTPUT:
Array containing the array "equivalents" and the modified datastring "dataString".
"dataString" is the string provided as input but without any coursecode sequences
representing the equivalents managed by the function. The names for these sequences remain.

"equivalents" is and array containing arrays of equivalent courses. To clearify:
If two courses are equivalent to eachother their coursecodes in string-format are
placed in the same array. This array is then placed in the array "equivalents" which
is returned. This is to allow for multiple courses to have equivalents. See examples.

EXAMPLES:
ARGUMENT: "<ul><li>ID1018 Programmering I&#160;</li><li>ID1020 Algoritmer och datastrukturer&#160;</li><li>IX1500/SF1610 Diskret matematik&#160;</li></ul>"
RETURNS: [[[IX1500, SF1601]], "<ul><li>ID1018 Programmering I&#160;</li><li>ID1020 Algoritmer och datastrukturer&#160;</li><li> Diskret matematik&#160;</li></ul>"]

ARGUMENT: "<ul><li>ID1018 Programmering I&#160;</li><li>AA0000/BB1111/CC2222 Biodling avancerad&#160;</li></ul></li><li>IX1500/SF1610 Diskret matematik&#160;</li></ul>"
RETURNS: [[[AA0000,BB1111,CC2222], [IX1500, SF1601]], "<ul><li>ID1018 Programmering I&#160;</li><li> Biodling avancerad&#160;</li></ul></li><li> Diskret matematik&#160;</li></ul>"]

ARGUMENT: "<ul><li>ID1018 Programmering I&#160;</li><li>ID1020 Algoritmer och datastrukturer&#160"
RETURNS: [[], "<ul><li>ID1018 Programmering I&#160;</li><li>ID1020 Algoritmer och datastrukturer&#160"]
*/
function getEquivalents(dataString) {



  var startIndex;
  var endIndex;

  var equivalents = [];

  //TODO: perhaps look into time comp? dataString is called in while condition without use
  while(dataString.search(/[A-Z][A-Z][0-9][0-9][0-9][0-9]\//g) != -1) {

    startIndex = dataString.search(/[A-Z][A-Z][0-9][0-9][0-9][0-9]\//g);
    endIndex = startIndex + dataString.slice(startIndex, dataString.length).search(/[, .]/g);

    var slicedData = dataString.slice(startIndex, endIndex);
    equivalents.push(slicedData.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g));
    dataString = dataString.replace(slicedData, "");

  }

  return [equivalents, dataString];
}
