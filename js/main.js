
globalIDcount = 0;
class Node {
    constructor(courseCode){
        this.courseCode = courseCode;
        this.prerequisites = [];
        this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
        this.parentNode = null;
        this._json_id = globalIDcount++;
    }

    // formats singular node to array format for Treant.js
    // format according to chart simple_chart_config, see treantTree.js and treant docs
    formatNode() {

      if (this.parentNode == null) {
        var arr = {
          _json_id: this._json_id,
          text: { name: this.courseCode }
        };

        return arr;
      } else {

        var arr = {
          _json_id: this._json_id,
          parent: this.parentNode,
          text: { name: this.courseCode }
        };

        return arr;

      }
    }

    // converts all nodes to treant array format and return array with all converted nodes
    exportTree() {

      // add current node to array
      var arr = [this.formatNode()];
      for (var i = 0; i < this.prerequisites.length; i++) {
        arr = arr.concat(this.prerequisites[i].exportTree());
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
    buildTree() {

      var reqArr = this.jsonToArray();

      for (var i = 0; i < reqArr.length; i++){
        var temp = new Node(reqArr[i]);

        temp.parentNode = this;
        this.addChild(temp);
        temp.buildTree();
      }
      return this;
    }

}


function chopTreeInverse(array, len) {



  var rootArr = array[0];
  root = new Node(rootArr[1]);

  root.parentNode = null;

  for (var i = 0; i < rootArr[3].length; i++) {
    var nodeInfo = getCorrectNodeArr(rootArr[3][i]);
    root.addChild(buildOtherNodePlz(root, nodeInfo));
  }



}

function buildOtherNodePlz(pear, yarr) {

  var node = new Node(yarr[1]);
  node.parentNode = pear;

  for (var i=0; i < yarr[3].length; i++) {
    var nodeInfo = getCorrectNodeArr(yarr[3][i]);
    node.addChild(buildOtherNodePlz(node, nodeInfo));
  }




}

function getCorrectNodeArr(nodeCourseCode) {

  console.log("looking for " + nodeCourseCode);
  console.log("gloabal arr: ");
  console.log(allPraiseTheArrGods);
  console.log(instanceCounter);

  for (var i=0; i < allPraiseTheArrGods.length; i++) {
    if(allPraiseTheArrGods[i][1] == nodeCourseCode) {
      console.log("found; " + nodeCourseCode);
      return allPraiseTheArrGods[i];
      break;
    }
  }

  console.log("getCorrectNodeArr error when looking for: " + nodeCourseCode);
  console.log(allPraiseTheArrGods);

}


// temp global for debug. declare in chopTreeInverse
var root = null;

















temp1 = new Node("II1305");
