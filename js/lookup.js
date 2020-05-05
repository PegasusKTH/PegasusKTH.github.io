

// takes JSON object as argument and browses for requirements, eligibility and names, and returns them in an array
// OBSERVE: prerequisites does not mean REQUIREMENTS, only recommendations
// return example: ["name", ["course eligibilities"], ["course prerequisites"]]
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

  if(data.course.credits){
    hp = data.course.credits;
  }

  //find period in format "PX (xx hp)"
  if(data.roundInfos[0]){
    var place = 0;
    
    for(var i = 0; i < data.roundInfos.length; i++){
      var s = data.roundInfos[i].round.courseRoundTerms[0].formattedPeriodsAndCredits; //potential bug if courseroundTerms[0] has more indexes and it does NOT mean version of course
      courseInPeriod[s[1]-1] = true;        
      
    }
    console.log(courseInPeriod) 
    for(var i = 0; i < courseInPeriod.length; i++){
      if(courseInPeriod[i] == true){
        periodArray.push("P"+ (i+1))        
      }

    }
    console.log(periodArray);
  }





  courseName = new String(data.course.title);
  finalResultArray = [courseName, eligArray, preqArray, hp, periodArray];
  console.log(finalResultArray);

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
