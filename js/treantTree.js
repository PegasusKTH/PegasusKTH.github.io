// config for tree container div
// see html
var config = {
	container: "#chart",

	node: {
		collapsable: true
	},
	connectors: {
		type: 'step'
	}

};

// listIntegration has taken jsonObject and converted it into a tree of nodes
	var listIntegration = nodifyLookupMAIN("id1020").buildTree();
	// console.log("buildTree");
	// temp2.buildTree();

	// sets up nodes in the right format for the Treant
	// console.log("exportTree");
	var nodeStructure = listIntegration.exportTree();

	// combine config with tree for treant graph generation
	// console.log("concat");
	var simple_chart_config = [config].concat(nodeStructure);


	// PrereqList gets datastructure form here.
	// function getRootNode() {
	// 	// console.log("return");
	// 	return listIntegration;
	// }
