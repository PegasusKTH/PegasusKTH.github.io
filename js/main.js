
globalIDcount = 0;
class Node {
    constructor(courseCode){
        this.courseCode = courseCode;
        this.prerequisites = [];
        this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
        this.parentNode = null;
        this._json_id = globalIDcount++;
        console.log("creating node: " + courseCode + " jsonID " + this._json_id);
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

        var resArr = lookup(courseCode)[1];

        console.log("Lookup for " + courseCode + " gave results:");
        console.log(resArr);

        return resArr;

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

function nodifyLookupMAIN(courseCode) {
  return new Node(courseCode);
}

// temp1 = new Node("II1305");
// temp2 = new Node("II1305");
