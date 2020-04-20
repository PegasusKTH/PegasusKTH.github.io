
document.write("hello world");


class Node {
    constructor(courseCode, name, color){
        this.courseCode = courseCode;
        this.courseName = name;
        this.courseColor = color;
        this.prerequisites = [];
    }

    addChild(node){
        this.prerequisites.push(node);
    }

    buildTree(stringArray){
        
    }
}


temp1 = new Node("Algoritmer och Datastrukturer", "ID1020", "Svart");
temp2 = new Node("Networks and Communication", "IK1203", "Vit");
temp3 = new Node("Discrete Mathematics", "SF1610", "Orange");