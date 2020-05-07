
// types out list element - not collapsable
function listElementNoChild(node) {
    document.writeln(
    "<li>"
        + "<a href=" + node.courseURL + ">" + node.courseCode + "</a>"
        + " - "
        + node.courseName
    +"</li>");
}
// types out list element - collapsable
function listElementWithChild(node) {
    document.writeln(
    '<li><span class="caret">'
        + "<a href=" + node.courseURL + ">" + node.courseCode + "</a>"
        + " - "
        + node.courseName
        + "</span>");
}

// Writes a nested list of the root parent and it's children
function traverseGraph(node) {
    // Write outs the parent
    // Displayed as: Hyperlink(CourseCode) - courseName
    if (node.equivalent.length > 0 || node.prerequisites.length > 0) {
        document.writeln(
            '<li><span class="caret">'
                + "<a href=" + node.courseURL + ">" + node.courseCode + "</a>"
                + " - "
                + node.courseName
                + "</span>"
        );
        document.write('<ul class="nested">'); // creates nested list of children
                node.prerequisites.forEach(element => { //adding children to list
                    traverseGraph(element);
                });

                if (node.equivalent.length > 0) {
                    document.write('<li><span class="caret"> Equivalent Courses</span>'); //Creates nested list of equivalent courses
                    document.write('<ul class="nested">');
                            node.equivalent.forEach(element => { //Adding equivalent courses to list
                                document.write(
                                "<li>"
                                    + "<a href=" + element.courseURL + ">" + element.courseCode + "</a>"
                                    + " - "
                                    + element.courseName
                                +"</li>"
                                );
                            })
                        document.write("</li>");
                    document.write('</ul>');
                }
            document.write("</ul>");
        document.write("</li>");
    } else {
        listElementNoChild(node);
    }
/*
    if (node.prerequisites.length == 0) {
        listElementNoChild(node);
    } else {
            listElementWithChild(node);
            document.write('<ul class="nested">'); // creates nested list of children
                node.prerequisites.forEach(element => { //adding children to list
                    traverseGraph(element);
                });

            document.write("</ul>");
        document.write("</li>");
    }
*/
}

document.write('<ul id="prereqUL">');
    traverseGraph(getRootNode());
document.write("</ul>");

var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}

/*
    IS1206 - Operativsystem     (expandable)
        ID1018
        IS1200
        ID1020                  (expandable)
            ID1018
        ID1019                  (expandable)
            IX1500              (expandable equivalents) // needs check for already expandable?
                SF1610
            ID1018
            ID1020              (expandable)
                ID1018


parent with equivalents no child    (expandable) check

parent with equivalents with child  (expandable) check

parent with no child                (not expandable)

parent with child                   (expandable) check




*/
