// Code for testing
/*
function constructor(courseCode, courseName){
    this.courseCode = courseCode;
    this.prerequisites = [];
    this.courseName = courseName; //temp
    //this.courseColor = color; //temp
    this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
}
*/
// Writes a nested list of the root parent and it's children
function traverseGraph(node) {
    // Write outs the parent 
    // II1305: https://www.kth.se/student/kurser/kurs/courseCode
    document.writeln("<li><a href=" + node.courseURL + ">" + node.courseCode + "</a>"+ " - " + node.courseName +"</li>"); 
        document.write("<ul>"); // creates nested list of children
            node.prerequisites.forEach(element => { //adding children to list
                traverseGraph(element);
            });
        document.write("</ul>");
}
// Code for testing
/*
node5 = new constructor("II1305", "Projekt inom informations- och kommunikationsteknik 7,5 hp");
node4 = new constructor("II1305", "Projekt inom informations- och kommunikationsteknik 7,5 hp");
node2 = new constructor("II1305", "Projekt inom informations- och kommunikationsteknik 7,5 hp");
node3 = new constructor("II1305", "Projekt inom informations- och kommunikationsteknik 7,5 hp");
node1 = new constructor("II1305", "Projekt inom informations- och kommunikationsteknik 7,5 hp");
node1.prerequisites = [node2, node3];
node2.prerequisites = [node4, node5];
*/
document.write("<ul>");
traverseGraph(node1);
document.write("</ul>");