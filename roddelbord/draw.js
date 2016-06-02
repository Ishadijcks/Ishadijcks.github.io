
var width = 1500,
    height = 920;

var color = d3.scale.category20();

var padding = 75, // separation between circles
    radius=50;

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(240)
    .size([width, height])
    .friction(0.1)

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "svg");

var createGraph = function(graph){
  $("#svg").html("");

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = svg.selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag)
    .on('dblclick', connectedNodes);

node.append("circle")
    .attr("r", radius)
    .style("opacity", 0);
node.append("text")
      .attr("dx", -10)
      .attr("dy", ".35em")
      .text(function(d) { return d.name })
      .style("stroke", function (d) {
    return getGenderColor(d.gender)
});
//Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
force.on("tick", function () {
    link.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
        return d.source.y;
    })
        .attr("x2", function (d) {
        return d.target.x;
    })
        .attr("y2", function (d) {
        return d.target.y;
    });
    d3.selectAll("circle").attr("cx", function (d) {
        return d.x;
    })
        .attr("cy", function (d) {
        return d.y;
    });
    d3.selectAll("text").attr("x", function (d) {
        return d.x;
    })
        .attr("y", function (d) {
        return d.y;
    });
    node.each(collide(0.5));
});

//Toggle stores whether the highlighting is on
var toggle = 0;
//Create an array logging what is connected to what
var linkedByIndex = {};
for (i = 0; i < graph.nodes.length; i++) {
    linkedByIndex[i + "," + i] = 1;
};
graph.links.forEach(function (d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});
//This function looks up whether a pair are neighbours
function neighboring(a, b) {
    return linkedByIndex[a.index + "," + b.index];
}

function getGenderColor(gender){
  if (gender == 1){
    return "#53BFF5";
  }
  if (gender == 2){
    return "#E650A0";
  }
}

function connectedNodes() {
    if (toggle == 0) {
        //Reduce the opacity of all but the neighbouring nodes
        d = d3.select(this).node().__data__;
        node.style("opacity", function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0.2;
        });
        link.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0.2;
        });
        //Reduce the op
        toggle = 1;
    } else {
        //Put them back to opacity=1
        node.style("opacity", 1);
        link.style("opacity", 1);
        toggle = 0;
    }
}


};






// Avoid collisions
function collide(alpha) {
  var quadtree = d3.geom.quadtree(graph.nodes);
  return function(d) {
    var rb = 2*radius + padding,
        nx1 = d.x - rb,
        nx2 = d.x + rb,
        ny1 = d.y - rb,
        ny2 = d.y + rb;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y);
          if (l < rb) {
          l = (l - rb) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}



createGraph(graph); 

$(document).ready(function(){

  $("#submitRoddel").on('click', function(){
    var name1 = document.getElementById("name1").value;
    var name2 = document.getElementById("name2").value;
    var gender1 = $("input[name=gender1]:checked").val()
    var gender2 = $("input[name=gender2]:checked").val()
    newLink(name1, gender1, name2, gender2);
  })

   $("#deleteRoddel").on('click', function(){
    var name1 = document.getElementById("deleteName1").value;
    var name2 = document.getElementById("deleteName2").value;
    removeLink(name1,name2);
  })

});