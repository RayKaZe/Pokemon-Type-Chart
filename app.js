var numTypes = 18;

var matrix = [
    [100,100,100,100,100,102,100,103,102,100,100,100,100,100,100,100,100,100],
    [101,100,102,102,100,101,102,103,101,100,100,100,100,102,101,100,101,102],
    [100,101,100,100,100,102,101,100,102,100,100,101,102,100,100,100,100,100],
    [100,100,100,102,102,102,100,102,103,100,100,101,100,100,100,100,100,101],
    
    [100,100,103,101,100,101,102,100,101,101,100,102,101,100,100,100,100,100],
    [100,102,101,100,102,100,101,100,102,101,100,100,100,100,101,100,100,100],
    [100,102,102,102,100,100,100,102,102,102,100,101,100,101,100,100,101,102],
    [103,100,100,100,100,100,100,101,100,100,100,100,100,101,100,100,102,100],
    
    [100,100,100,100,100,101,100,100,102,102,102,100,102,100,101,100,100,101],
    [100,100,100,100,100,102,101,100,101,102,102,101,100,100,101,102,100,100],
    [100,100,100,100,101,101,100,100,100,101,102,102,100,100,100,102,100,100],
    [100,100,102,102,101,101,102,100,102,102,101,102,100,100,100,102,100,100],
    
    [100,100,101,100,103,100,100,100,100,100,101,102,102,100,100,102,100,100],
    [100,101,100,101,100,100,100,100,101,100,100,100,100,102,100,100,103,100],
    [100,100,101,100,101,100,100,100,102,102,102,101,100,100,102,101,100,100],
    [100,100,100,100,100,100,100,100,102,100,100,100,100,100,100,101,100,103],
    
    [100,102,100,100,100,100,100,101,100,100,100,100,100,101,100,100,102,102],
    [100,101,100,102,100,100,100,100,102,102,100,100,100,100,100,101,101,100]
];

var typeNames = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'];
var sprites = ['sprites/rattata.gif',
    'sprites/machop.gif',
    'sprites/pidgey.gif',
    'sprites/zubat.gif',
    'sprites/diglett.gif',
    'sprites/geodude.gif',
    'sprites/caterpie.gif',
    'sprites/gastly.gif',
    'sprites/magnemite.gif',
    'sprites/charmander.gif',
    'sprites/squirtle.gif',
    'sprites/bulbasaur.gif',
    'sprites/pikachu.gif',
    'sprites/abra.gif',
    'sprites/lapras.gif',
    'sprites/dratini.gif',
    'sprites/murkrow.gif',
    'sprites/jigglypuff.gif'
];
    
var chord = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.ascending)
    .matrix(matrix);

var width = 900,
    height = 900,
    r1 = height / 2,
    innerRadius = Math.min(width, height) * .3,
    outerRadius = innerRadius * 1.1;

var fill = d3.scale.ordinal()
    .domain(d3.range(numTypes))
    .range([
        '#A8A878', '#C03028', '#A890F0', '#A040A0', 
        '#E0C068', '#B8A038', '#A8B820', '#705898', 
        '#B8B8D0', '#F08030', '#6890F0', '#78C850', 
        '#F8D030', '#F85888', '#98D8D8', '#7038F8', 
        '#705848', '#EE99AC']);

var svg = d3.select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("g").selectAll("path")
    .data(chord.groups)
  .enter().append("path")
    .style("fill", function(d) { return fill(d.index); })
    .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

svg.append("g").selectAll(".arc")
    .data(chord.groups)
    .enter().append("svg:text")
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) { return ((d.startAngle + d.endAngle) / 2) > Math.PI ? "end" : null; })
    .attr("transform", function(d) {
        return "rotate(" + (((d.startAngle + d.endAngle) / 2) * 180 / Math.PI - 90) + ")"
        + "translate(" + (r1 - 145) + ")"
        + (((d.startAngle + d.endAngle) / 2) > Math.PI ? "rotate(180)" : "");
    })
    .text(function(d) {
        return typeNames[d.index];
    })
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

svg.append("g").selectAll(".arc")
    .data(chord.groups)
    .enter().append("svg:image")
    .attr("x", "-40")
    .attr("y", "-40")
    .attr("width", "80")
    .attr("height", "80")
    .attr("xlink:href", function(d) { return sprites[d.index]; })
    .attr("transform", function(d) {
        return "rotate(" + -90 + ")" + "translate(" + (0.9*r1*Math.cos((d.startAngle + d.endAngle) / 2)) + " " + 0.9*r1*Math.sin((d.startAngle + d.endAngle) / 2) + ")" + "rotate(" + 90 + ")";
    })
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

svg.append("g")
    .attr("class", "chord")
  .selectAll("path")
    .data(chord.chords)
  .enter().append("path")
    .attr("d", d3.svg.chord().radius(innerRadius))
    .style("fill", function(d) { 
        if (matrix[d.source.index][d.target.index] == 101) return "#1abc9c";
        if (matrix[d.source.index][d.target.index] == 102) return "#e74c3c";
        if (matrix[d.source.index][d.target.index] == 103) return "#7f8c8d";
        return "#bdc3c7";
    });

function fade(opacity) {
  return function(g, i) {
    svg.selectAll(".chord path")
        .filter(function(d) { return d.source.index != i && d.target.index != i ;})
      .transition()
        .style("opacity", opacity);

    svg.selectAll(".chord path")
        .filter(function(d) { return d.source.index == i;})
     // .transition()
        .style("fill", function(d) {
        	if (matrix[d.source.index][d.target.index] == 101) return "#1abc9c";
	        if (matrix[d.source.index][d.target.index] == 102) return "#e74c3c";
	        if (matrix[d.source.index][d.target.index] == 103) return "#7f8c8d";
	        return "#bdc3c7";
        });
  };
}