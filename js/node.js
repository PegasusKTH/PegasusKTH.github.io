globalIDcount = 0;

class Node { // Originally Edvin/Alex
    constructor(courseCode){
      this.courseName;
      this.courseCode = courseCode;
      this.prerequisites = [];  // good for you
      this.eligibility = [];    // REQUIRED
      this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
      this.parentNode = null;
      this._json_id = globalIDcount++;
    }
  
    // Build tree from rootnode with prerequisite-list and eligibility-list
    // Not implemented yet, takes first root node and recursively builds a tree
    buildTree() {
        console.log(this.eligibility);
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
    // NEEDS TO ADD ELIGIBILITY ARRAY SUPPORT
    exportTree() {
        // add current node to array
        var arr = [this.formatNode()];
        for (var i = 0; i < this.prerequisites.length; i++) {
          arr = arr.concat(this.prerequisites[i].exportTree());
        }
  
        return arr;
      }
  
  }
  // Takes the array with course information and 
  // creates a Node to be root node in the graph
  function nodifyLookup(courseCode){
    var temp = lookup(courseCode);
    var rootNode = new Node(courseCode);
    
    rootNode.courseName = temp[0];
    rootNode.eligibility = stringToArray(temp[1]);
    rootNode.prerequisites = stringToArray(temp[2]);
  
    return rootNode;
  }

  // takes an array of coursecodes in array format and returns a node array
  // ex; ["ID1020", "II1305", "SF1610"] -> [node ID1020, node II1305, node SF1610] DOES NOT DO THIS!!!
  function stringToArray(array){
    var nodeArray = [];
    for (i = 0; i < array.length; i++){
        nodeArray.push(new Node(array[i]));
    }
    return nodeArray;
  }
  
  // Maybe needs a return statement????
  function searchbox() {
    mainRootNode = new nodifyLookup("inputfromsearchbox");
    mainRootNode.buildTree();
  }
  
  /*
  lookup("1305") --> searching(lookup("1305")) 
  @param: json @output: return example: ["name", ["course eligibilities"], ["course prerequisites"]]
  
  
  */

 temp1 = new Node("II1305");