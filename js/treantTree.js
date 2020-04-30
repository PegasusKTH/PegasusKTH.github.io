// config for tree container div
// see html
const treetop = "ID1206";

let TREANT = {
	chart: {
    container: "#chart",
		node: {collapsable: true},
		connectors: {type: 'step', style: {opacity:100,}},
		nodeAlign: "top",
  },
  nodeStructure: {
    text: {
      id: treetop,
      name: undefined,
      credits: undefined,
    },
    children: [],
  }
}

let lookups = [TREANT.nodeStructure] //list of ids to look up. also using the TREANT structure instead of making a new one and then transplanting.

while(lookups.length > 0) { //we iterate until there are nothing left to look up
  let active = lookups[0]; //defining the current object
  lookups.shift();//removing the current object from future lookups


  let result = lookup(active.text.id);

  let children = result[1];
  active.text.name = ""+result[0]; // gotta coerce the "string" to act like a proper string
  active.text.credits = 7.5; //result[3]+" hp";

  for(i=0; i<children.length;i++) {
    //babymakin'. we figure out the undefined parts when we lookup that specific course.
    active.children[i] = {text:{id:children[i],name:undefined,credits:undefined,},parent:active,children:[]}
    lookups.push(active.children[i]) //pushing the children to the list of IDs to look up
  }
}

let TREE = new Treant(TREANT, $); //making the tre yo
