// Is to be removed after graph constructor called instead
function constructor(courseCode, courseName){
    this.courseCode = courseCode;
    this.prerequisites = [];
    this.courseName = courseName; //temp
    //this.courseColor = color; //temp
    this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
}
// Is to be removed after graph constructor called instead
function tempFunction() {
    node5 = new constructor("II1305", "Kurs 5 - 15 hp");
    node4 = new constructor("II1305", "Kurs 4 - 7,5 hp");
    node3 = new constructor("II1305", "Kurs 3 - 7,5 hp");
    node2 = new constructor("II1305", "Kurs 2 - 7,5 hp");
    node1 = new constructor("II1305", "Projekt inom informations- och kommunikationsteknik 7,5 hp");
    node1.prerequisites = [node2, node3];
    node2.prerequisites = [node4, node5];

    rootNode = node1;

    return rootNode;
}

// Writes a nested list of the root parent and it's children
function traverseGraph(node) {
    // Write outs the parent 
    // Displayed as: Hyperlink(CourseCode) - courseName
    document.writeln("<li><a href=" + node.courseURL + ">" + node.courseCode + "</a>"+ " - " + node.courseName +"</li>"); 
        document.write("<ul>"); // creates nested list of children
            node.prerequisites.forEach(element => { //adding children to list
                traverseGraph(element);
            });
        document.write("</ul>");
}

document.write("<ul>");
traverseGraph(tempFunction()); // change tempFunction to the graph constructor (from Edvin & Alex)
document.write("</ul>");

