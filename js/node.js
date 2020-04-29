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
        // root
        if (this.parentNode == null) {
          var nodeStructure = {
            text: { name: this.courseCode }
          };
  
          return nodeStructure;

        } else {
          
        }
    }

    exportTree(){
      var nodeStructure = this.formatNode();

      return nodeStructure;
    }

    testStructure() {
      var chart_config = {
        chart: {
            container: "#collapsable-example",

            animateOnInit: true,
            
            node: {
                collapsable: true
            },
            animation: {
                nodeAnimation: "easeOutBounce",
                nodeSpeed: 700,
                connectorsAnimation: "bounce",
                connectorsSpeed: 700
            }
        },
        nodeStructure: {
            image: "img/malory.png",
            children: [
                {
                    image: "img/lana.png",
                    collapsed: true,
                    children: [
                        {
                            image: "img/figgs.png"
                        }
                    ]
                },
                {
                    image: "img/sterling.png",
                    childrenDropLevel: 1,
                    children: [
                        {
                            image: "img/woodhouse.png"
                        }
                    ]
                },
                {
                    pseudo: true,
                    children: [
                        {
                            image: "img/cheryl.png"
                        },
                        {
                            image: "img/pam.png"
                        }
                    ]
                }
            ]
        }
    };
    return chart_config;
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