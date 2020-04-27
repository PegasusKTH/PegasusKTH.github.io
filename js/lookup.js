
// takes JSON object as argument and browses for requirements, eligibility and names, and returns them in an array
// OBSERVE: prerequisites does not mean REQUIREMENTS, only recommendations
// return example: ["name", ["course eligibilities"], ["course prerequisites"]]
function searching(data){
  var eligArray = [];
  var requiredCourse;
  var preqArray = [];
  var courseName;
  var finalResultArray = [];

  // this one finds the eligibility courses (REQUIRED COURSES)
  // can be found in the KOPPS API under PublicSyllabusVersions 0 (recent)
  if(data.publicSyllabusVersions[0].courseSyllabus.eligibility){
    requiredCourse = data.publicSyllabusVersions[0].courseSyllabus.eligibility;
  }
  eligArray = new Array(requiredCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g))

  //this one finds the prerequisites (recommended courses)
  // can be found in the KOPPS API somewhere
  if(data.course.prerequisites){
    var recommendedCourse = data.course.prerequisites;
    //finds all coursecodes in the recommended courses string
    preqArray = new Array(recommendedCourse.match(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/g));//recs;
  }

  courseName = new String(data.course.title);
  finalResultArray = [courseName, eligArray, preqArray];

  console.log("finalResultArray: " + finalResultArray);
  return finalResultArray;
}

// first function called, takes a course ID as argument and calls for 'searching' function with JSON object from KOPPS api
// returns result: passes JSON object as argument to 'searching' and returns result
function lookup(courseID){
  var jsonObject;
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.kth.se/api/kopps/v2/course/' + courseID +  '/detailedinformation', false);  // `false` makes the request synchronous
  request.send(null);
    
  if (request.status === 200) {// That's HTTP for 'ok'
    jsonObject = JSON.parse(request.responseText);
    return searching(jsonObject);
  }

}






class Node {
  constructor(courseCode){
    this.courseName;
    this.courseCode = courseCode;
    this.prerequisites = [];  // Prerequisites
    this.eligibility = [];    // Recommended
    this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
    this.parentNode = null;
    this._json_id = globalIDcount++;
  }

  // Build tree from rootnode with prerequisite-list and eligibility-list
  buildTree() {
    // prerequisite-list
    for (var i = 0; i < this.prerequisites.length; i++){
      var tempPrereq = new Node(this.prerequisites[i]);
      tempPrereq.parentNode = this;
      this.prerequisites.push(tempPrereq);

      tempPrereq.buildTree();
    }
    // eligibility-list
    for (let j = 0; j < this.eligibility.length; j++) {
      var tempElig = new Node(this.eligibility[j]);
      tempElig.parentNode = this;
      this.eligibility.push(tempElig)

      tempElig.buildTree();
    }
    return this;
  }
}
// Takes the array with course information and 
// creates a Node to be root node in the graph
function nodifyLookup(courseCode){
  var temp = lookup(courseCode);
  var rootNode = new Node(courseCode);
  rootNode.courseName = temp[0];
  rootNode.eligibility = temp[1];
  rootNode.prerequisites = temp[2];

  return rootNode;
}

// Maybe needs a return statement????
function searchbox() {
  mainRootNode = new nodifyLookup("inputfromsearchbox");
  mainRootNode.buildTree();
}

/*
lookup("1305") --> searching(lookup("1305")) 
@param: json @output: return example: ["name", ["course eligibilities"], ["course prerequisites"]]


*/