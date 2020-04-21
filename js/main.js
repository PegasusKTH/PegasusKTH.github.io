
document.write("hello world123");

class Node {
    constructor(courseCode){
        this.courseCode = courseCode;
        this.prerequisites = [];
        this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode; 
        this.parentNode = null;
    }

    jsonToArray(){
      var courseCode = this.courseCode;

        //This temp code is where Patrik and Jings code will be written
        //It will in turn call for Erik and Celines code
        //It will at last return an array string with prerequisites for the given course

        if (courseCode == "II1305") {
          return ["ID1018", "ID1020", "IS1200"];
        } else if (courseCode == "ID1018") {
          return []
        } else if (courseCode == "ID1020") {
          return ["ID1018", "IS1200"]
        } else if (courseCode == "IS1200") {
          return []
        }

    }

    addChild(node){
        this.prerequisites.push(node);
    }

    buildTree(){

      var reqArr = this.jsonToArray();

      for (var i = 0; i < reqArr.length; i++){
        var temp = new Node(reqArr[i]);
        
        temp.parentNode = this;
        this.addChild(temp);
        temp.buildTree();
      }
    }
}



temp1 = new Node("II1305");
