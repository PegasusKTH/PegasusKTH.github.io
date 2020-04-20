
document.write("hello world");


class Node {
    constructor(prerequisite, name, color){
        this.prerequisite = prerequisite;
        this.courseName = name;
        this.courseColor = color;
        this.children = [];
    }

    addChild(node){
        this.children.push(node);
    }
}



temp1 = new Node("ID1020", "Algodata", "Svart");
temp2 = new Node("IK1203", "Matte", "Vit");
temp3 = new Node("SF1610", "Fysik", "Orange");