/*
function constructor(courseCode){
        this.courseCode = courseCode;
        this.prerequisites = [];
        //this.courseName = name; //temp
        //this.courseColor = color; //temp
        this.courseURL = "https://www.kth.se/student/kurser/kurs/" + courseCode;
    }
*/
// Writes a nested list of the root parent and it's children
function traverseGraph(node) {
    // Write outs the parent 
    // II1305: https://www.kth.se/student/kurser/kurs/courseCode
    document.writeln(
        "<li> " 
            + node.courseCode
            /*+ " - " + node.courseName */ //Remove comment to att coursename in format
            + ": " + node.courseURL + 
        "</li>"); 
        document.write("<ul>") // creates nested list of children
            node.prerequisites.forEach(element => { //adding children to list
                traverseGraph(element);
            });
        document.write("</ul>")
}

document.write("<ul>");
traverseGraph(node1);
document.write("</ul>");