
document.write("hello world123");

class Node {
    constructor(courseCode){
        this.courseCode = courseCode;
        this.prerequisites = [];
        this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
        this.parentNode = null;
    }

    // formats singular node to array format for Treant.js
    // format according to chart simple_chart_config, see treantTree.js and treant docs
    formatNode() {
      var arr = {
        parent: this.parentNode,
      	text: { name: this.courseCode }
      }
      return arr;
    }

    // converts all nodes to treant array format and return array with all converted nodes
    exportTree() {
      // add current node to array
      var arr = [this.formatNode()];
      for (var i = 0; i < this.prerequisites[i]; i++) {
        arr.concat(this.prerequisites[i].exportTree());
      }

      return arr;
    }

    // temp function to represent patrik&jing and erik&celine features
    // input course code
    // expected output is string array of required courses course codes. empty array if none exist
    jsonToArray(){
      var courseCode = this.courseCode;

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

    // adds child node to parent node prerequisites array
    addChild(node){
        this.prerequisites.push(node);
    }

    // recursively goes through all prerequisites according to json files.
    // fully constructs tree object for later export
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
