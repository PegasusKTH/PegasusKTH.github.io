
document.write("hello world");

class Node {
  constructor(courseCode){
      this.courseCode = courseCode;
      // this.courseName = name; for basic testing, this is disabled
      // this.courseColor = color;
      this.prerequisites = erikCeline(patrikJing(courseCode));
  }

  addChild(node){
      this.prerequisites.push(node);
  }

  // expected input ["code1", "code2", "code3", ... ]
  buildTree(stringArray){

    for (i = 0; i < this.prerequisites.length; i++) {

      temp = new Node(prerequisites[i]);
      
      addChild(temp);





      this.addChild( new Node(prerequisites[i]) );
      buildTree(prerequisites(prerequisites.lenght));

    }
  }
}


temp1 = new Node("Algoritmer och Datastrukturer", "ID1020", "Svart");
temp2 = new Node("Networks and Communication", "IK1203", "Vit");
temp3 = new Node("Discrete Mathematics", "SF1610", "Orange");























//
