import * as React from 'react';
import { Link } from 'react-router';
import GroupEntity from '../../entities/groupEntity';


var d3 = require("d3");
var autobind = require('autobind-decorator');

interface Props extends React.Props<GroupEntity> {
    groups: Array<GroupEntity>
}

export default class BubbleChart extends React.Component<Props, {}> {


    public componentDidMount() {
        var diameter = 800, //max size of the bubbles
            color = d3.scale.category20(); //color category

        var bubble = d3.layout.pack()
            .sort(null)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select(".bubbles")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        //convert numerical values from strings to numbers
        var data = this.props.groups.map(function (d) { d["value"] = +d["Global_Sales"]; return d; });

        //bubbles needs very specific format, convert data to this.
        var nodes = bubble.nodes({ children: data }).filter(function (d) { return !d.children; });
        
        //setup the chart
        var bubbles = svg.append("g")
            .attr("transform", "translate(0,0)")
            .selectAll(".bubble")
            .data(nodes)
            .enter();

        //create the bubbles
        bubbles.append("circle")
            .attr("r", function (d) { return d.r; })
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .style("fill", function (d) { return color(d.value); });

        //format the text for each bubble
        bubbles.append("text")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y + 5; })
            .attr("text-anchor", "middle")
            .text(function (d) { return d["_id"]; })
            .style({
                "fill": "white",
                "font-family": "Helvetica Neue, Helvetica, Arial, san-serif",
                "font-size": "12px"
            });
    }

    public render() {
        return (<div className="bubbles"></div>);

    }


}
