
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

// temp1 temporary node. make this into function call
var listIntegration = temp1.buildTree();
var arr = temp1.exportTree();

// combine config with tree for treant graph generation
var simple_chart_config = [config].concat(arr);


function getRootNode() {
	console.log("return");
	return listIntegration;
}
