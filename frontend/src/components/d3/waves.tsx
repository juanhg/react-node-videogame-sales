import * as React from 'react';
import { Link } from 'react-router';
import VideogameEntity from '../../entities/videogameEntity';

var d3 = require("d3");
var autobind = require('autobind-decorator');

interface Props extends React.Props<waves> { }

export default class waves extends React.Component<Props, {}> {


    public componentDidMount() {
        var width = Math.max(700, innerWidth),
            height = Math.max(500, innerHeight);

        var i = 0;

        var svg = d3.select(".waves").append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

        function particle() {
            var m = d3.mouse(this);

            svg.append("circle", "rect")
                .attr("cx", m[0])
                .attr("cy", m[1])
                .attr("r", 1e-6)
                .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
                .style("stroke-opacity", 1)
                .transition()
                .duration(2000)
                .ease(Math.sqrt)
                .attr("r", 100)
                .style("stroke-opacity", 1e-6)
                .remove();

            d3.event.preventDefault();
        }
    }

    public render() {
        return (<div className="waves"></div>);
    }


}
