

// takes JSON object as argument and browses for requirements, eligibility and names, and returns them in an array
// OBSERVE: prerequisites does not mean REQUIREMENTS, only recommendations
// return example: ["name", ["course eligibilities"], ["course prerequisites"]]
function searching(data){ // Originally Erik/Celine
  var eligArray = [];
  var requiredCourse = "";
  var preqArray = [];
  var courseName;
  var finalResultArray = [];

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

// first function called, takes a course ID as argument and calls for 'searching' function with JSON object from KOPPS api
// returns result: passes JSON object as argument to 'searching' and returns result
function lookup(courseID){ // Originally Patrick/Jing group
  var jsonObject;
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.kth.se/api/kopps/v2/course/' + courseID +  '/detailedinformation', false);  // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {// That's HTTP for 'ok'
    jsonObject = JSON.parse(request.responseText);
    return searching(jsonObject);
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
    endIndex = startIndex + dataString.slice(startIndex, dataString.length).search(" ");

    var slicedData = dataString.slice(startIndex, endIndex);

    equivalents.push(slicedData.split("/"));
    dataString = dataString.replace(slicedData, "");

  }

  return [equivalents, dataString];
}
































//
