globalIDcount = 0;
class Node {
    constructor(courseCode){
        this.courseCode = courseCode;
        this.courseName = null;
        this.prerequisites = [];
        this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
        this.parentNode = null;
        this._json_id = null;
        console.log("creating node: " + courseCode + " jsonID " + this._json_id);
    }

    setName(name) {
      this.courseName = name;
    }

    // formats singular node to array format for Treant.js
    // format according to chart simple_chart_config, see treantTree.js and treant docs
    formatNode() {

      if (this.parentNode == null) {
        var arr = {
          _json_id: this._json_id,
          text: { code: this.courseCode, name:this.courseName.replace(" ", " "), id:"ID: " + this._json_id}
        };

        return arr;
      } else {

        var arr = {
          _json_id: this._json_id,
          parent: this.parentNode,
          text: { code: this.courseCode, name:this.courseName.replace(" ", " "), id:"ID: " + this._json_id}
        };

        return arr;

      }
    }
    // BFS to assing _json_id
    assignIdentifiers(queue) {
      console.log(this.courseCode)
      console.log(globalIDcount);
      this.prerequisites.forEach(element => {
        queue.push(element);
      });
      this._json_id = globalIDcount++;

      var nextNode = queue.shift();

      if (queue.length > 0) {
        nextNode.assignIdentifiers(queue);
      } else {
        nextNode._json_id = globalIDcount++;
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

        var resArr = lookup(courseCode);
        // var resName = lookup(courseCode)[0];

        console.log("Lookup for " + courseCode + " gave results:");
        console.log(resArr[1]);

        return resArr;

    }

    // adds child node to parent node prerequisites array
    addChild(node){
        this.prerequisites.push(node);
    }

    // recursively goes through all prerequisites according to json files.
    // fully constructs tree object for later export
    buildTree() {

      var lookup = this.jsonToArray();
      var reqArr = lookup[1];
      this.setName(lookup[0]);

      for (var i = 0; i < reqArr.length; i++){
        var temp = new Node(reqArr[i]);
        temp.parentNode = this;
        this.addChild(temp);
        console.log("adding child: " + temp.courseCode + " to " + this.courseCode);


        temp.buildTree();
      }
      return this;
    }

}

function nodifyLookupMAIN(courseCode) {
  return new Node(courseCode);
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
