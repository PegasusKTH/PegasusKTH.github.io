
document.write("hello world123");

class Node {
    constructor(courseCode){
        this.courseCode = courseCode;
        //courseName = name; //temp
        //courseColor = color; //temp
        this.prerequisites = [];
    }

    jsonToArray(){
      var courseCode = this.courseCode;
        //patrikjing
        //erikceline
        //temp code returns three strings depending on called number

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

        this.addChild(temp);
        temp.buildTree();
      }
    }
}




test = function(firstCourseID){
    for (var i = 0; i < 3; i++){
        Node.buildTree(Node.jsonToArray(i));
    }
    //Node.buildTree(Node.jsonToArray(firstCourseID))
}

temp1 = new Node("II1305");
