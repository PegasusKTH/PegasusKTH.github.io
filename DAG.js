
document.write("hello world123");

class Node {
    constructor(courseCode){
        this.courseCode = courseCode;
        this.courseName = name; //temp
        this.courseColor = color; //temp
        this.prerequisites = [];
    }

    jsonToArray(courseCode, num){
        //patrikjing
        //erikceline
        //temp code returns three strings depending on called number
        if (num == 1){
            return testString1;
        } else if (num == 2){
            return testString2;
        } else if (num == 3){
            return testString3;
        } else {
            return "xd";
        }
    }

    addChild(node){
        this.prerequisites.push(node);
    }

    buildTree(stringArray){
        for (i=0; i < stringArray.prerequisites.length; i++){
            temp = new Node(stringArray.prerequisites[i]);
            temp.prerequisites = stringArray.jsonToArray(stringArray.prerequisites[i]);

            this.addChild(temp);
            this.buildTree(temp);
        }
    }
  }
}



test = function(firstCourseID){
    for (i = 0; i < 3; i++){
        Node.buildTree(Node.jsonToArray(i));
    }
    //Node.buildTree(Node.jsonToArray(firstCourseID))
}

temp1 = new Node("ID1020", "Svart");
temp2 = new Node("IK1203", "Vit");
temp3 = new Node("SF1610", "Orange");
testStringArray[testString1, testString2, testString3];
testString1 = ["IK1203", "SF1610"];
testString2 = ["LOL123", "hehe456"];
testString3 = ["test last"];
