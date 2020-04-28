// globalIDcount = 0;
var globalIDCounter = 0;

class Node { // Originally Edvin/Alex
    constructor(courseCode){
      this.courseName;
      this.courseCode = courseCode;
      this.prerequisites = [];  // good for you
      this.eligibility = [];    // REQUIRED
      this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
      this.parentNode = null;
      this._json_id = null;
    }
  
    // Build tree from rootnode with prerequisite-list and eligibility-list
    // Not implemented yet, takes first root node and recursively builds a tree
    buildTree() {
      //console.log(globalIDcount);
      console.log(this._json_id);

      // replaces string children array with node child array for all index
      for(var i = 0; i < this.eligibility.length; i++){
        this.eligibility[i] = nodifyLookup(this.eligibility[i]);
      }

      for(var i = 0; i < this.eligibility.length; i++){
        this.eligibility[i].buildTree();
        this.eligibility[i].parentNode = this;
      }

      return this;
    }



    // formats singular node to array format for Treant.js
    // format according to chart simple_chart_config, see treantTree.js and treant docs
    formatNode() {

        if (this.parentNode == null) {
          var nodeStructure = {
            text: { name: this.courseCode }
            //_json_id: this._json_id
          };
  
          return nodeStructure;
        } else {
          var children = {
            _json_id: this._json_id,
            parent: this.parentNode,
            text: { name: this.courseCode }
          };
  
          return children;
  
        }
    }

    exportTree(){
      var nodeStructure = [this.formatNode()];
        
      for (var i = 0; i < this.eligibility.length; i++) {
          nodeStructure = nodeStructure.concat(this.eligibility[i].exportTree());
      }
      return nodeStructure;
    }
  }

  // function assignIDs(tree){
  //   for(var i = 0; i < tree.eligibility.length; i++){
  //     //tree._json_id = globalIDCounter + 1;
  //     tree.counter = globalIDCounter++;
  //     console.log("TIMES RUN LOOP: " + i + ", TIMES GLOBALED: "+ globalIDCounter);
  //     assignIDs(tree.eligibility[i]);
  //   }

  //   return tree;
  // }

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

//  temp1 = new Node("II1305");