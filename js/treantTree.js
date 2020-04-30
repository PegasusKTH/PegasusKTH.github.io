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
var listIntegration = nodifyLookupMAIN("ID1206").buildTree();

listIntegration.assignIdentifiers([]);

// sets up nodes in the right format for the Treant
var nodeStructure = listIntegration.exportTree();

// combine config with tree for treant graph generation
var simple_chart_config = [config].concat(nodeStructure);
