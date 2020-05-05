function searching(){
  var courseCode = document.getElementById("coursecode").value;
  console.log(courseCode);
  document.getElementById("graphnlist").innerHTML = courseCode;
  // // listIntegration has taken jsonObject and converted it into a tree of nodes
  // var listIntegration = nodifyLookupMAIN(courseCode).buildTree(); // SearchBox integration needed.
  //
  // listIntegration.assignIdentifiers([]);
  //
  // // sets up nodes in the right format for the Treant
  // var nodeStructure = listIntegration.exportTree();
  //
  // // combine config with tree for treant graph generation
  // var simple_chart_config = [config].concat(nodeStructure);
}
