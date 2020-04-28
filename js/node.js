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
      var replacerArray = [];

      for(var i = 0; i < this.eligibility[0].length; i++){
        replacerArray.push(nodifyLookup(this.eligibility[0][i]));
      }
      this.eligibility = replacerArray;
      
      for(var i = 0; i < this.eligibility[0].length; i++){
        this.eligibility[0][i].buildTree();
      }

      return this;
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
    var temp = lookup(courseCode); //here we have a JSON obj
    var rootNode = new Node(courseCode);
    
    rootNode.courseName = temp[0];
    rootNode.eligibility = temp[1];
    rootNode.prerequisites = temp[2];
  
    return rootNode;
  }
  
  /*
  lookup("1305") --> searching(lookup("1305")) 
  @param: json @output: return example: ["name", ["course eligibilities"], ["course prerequisites"]]
  
  
  */

 temp1 = new Node("II1305");