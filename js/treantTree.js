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
var listIntegration = nodifyLookup("II1305").buildTree();
//var wegotIDs = assignIDs(listIntegration);
var testStructure = listIntegration.testStructure();
var nodeStructure = listIntegration.exportTree();

//var rootNode = nodifyLookup("II1305").buildTree();
// var arr = rootNode.exportTree();

// var listIntegration = temp1.buildTree();
// var arr = temp1.exportTree();

// combine config with tree for treant graph generation
var simple_chart_config = [config].concat(nodeStructure);
var simple_chart_config_test = testStructure;

function getRootNode() {
	// console.log("return");
	return listIntegration;
}

/*
simple_chart_config = 
{
	chart:
	{
        container: "#tree-simple"
    },
    
	nodeStructure: 
	{
		text: { name: "Parent node" 
	},
		
		children: 
		[
            {
				text: { name: "First child" }
            },
            {
                text: { name: "Second child" }
            }
        ]
    }
};

HOW CONCAT WORKS(?)
1.
config = {
	container: "#chart",

	node: {
		collapsable: true
	},
	connectors: {
		type: 'step'
	}

}

2. CONCAT (NODESTRUCTURE)

nodeStructure: {
	text: { name: "Parent node" },
	children: [
		{
			text: { name: "First child" }
		},
		{
			text: { name: "Second child" }
		}
	]
}

3. CONCAT (CHILDREN)

children: [
		{
			text: { name: "First child" }
		},
		{
			text: { name: "Second child" }
		}
	]

*/
