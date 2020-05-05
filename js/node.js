/*
  This file contains the structure of the tree and nodes. It also contains functions to recursivly
  build the tree and export it to Treant library. 
*/

globalIDcount = 0;
class Node {
    constructor(courseCode){
        this.courseCode = courseCode;
        this.courseName = null;
        this.prerequisites = [];
        this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
        this.parentNode = null;
        this._json_id = null;
        this.equivalent = [];
    }

    setName(name) {
      this.courseName = name;
    }

    // formats singular node to array format for Treant.js
    // format according to chart simple_chart_config, see main.js and treant docs
    formatNode() {

      if (this.parentNode == null) {
        var arr = {
          _json_id: this._json_id,
          text: { code: this.courseCode, name:this.courseName.replace(" ", " ") }
        };

        return arr;
      } else {

        var arr = {
          _json_id: this._json_id,
          parent: this.parentNode,
          text: { code: this.courseCode, name:this.courseName.replace(" ", " ") }
        };

        return arr;
      }
    }
    // BFS to assing _json_id
    assignIdentifiers(queue) {
      this.prerequisites.forEach(element => {
        queue.push(element);
      });
      this._json_id = globalIDcount++;

      var nextNode = queue.shift();

      if (queue.length > 0 || nextNode.prerequisites.length > 0) {
        nextNode.assignIdentifiers(queue);
      } else {
        nextNode._json_id = globalIDcount;
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

    // input course code
    // expected output is string array of required courses course codes. empty array if none exist
    jsonToArray(){
      var courseCode = this.courseCode;
      var resArr = lookup(courseCode);

      return resArr;
    }

    // adds child node to parent node prerequisites array
    addChild(node){
        this.prerequisites.push(node);
    }

    // recursively goes through all prerequisites according to json files.
    // fully constructs tree object for later export
    buildTree() {

      console.log(this.courseCode);
      var lookup = this.jsonToArray();
      var reqArr = lookup[1];
      this.setName(lookup[0]);

      for (var i = 0; i < reqArr.length; i++){
        
        if (typeof reqArr[i] == "object") {
          var temp = new Node(reqArr[i][0]);

          temp.equivalent = reqArr[i].shift();
          this.addChild(temp);

        } else {
          var temp = new Node(reqArr[i]);
          temp.parentNode = this;
          this.addChild(temp);

          temp.buildTree();
        }
      }
      return this;
    }

}
// Node creation
function nodifyLookupMAIN(courseCode) {
  return new Node(courseCode);
}
