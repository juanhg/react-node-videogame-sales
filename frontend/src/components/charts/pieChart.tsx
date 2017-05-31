import * as React from 'react';
import { Link } from 'react-router';
import VideogameEntity from '../../entities/videogameEntity';
var PChart = require('react-d3-tooltip').PieTooltip;

//TODO replace mocked data with real info

var width = 1000,
  height = 700,
  value = function (d) {
    return +d.Global_Sales;
  },
  name = function (d) {
    return d.Genre;
  },
  chartSeries = [
    {
      "field": "Action",
      "name": "Action"
    },
    {
      "field": "Adventure",
      "name": "Adventure"
    },
    {
      "field": "Fighting",
      "name": "Fighting"
    },
        {
      "field": "Misc",
      "name": "Misc"
    },    {
      "field": "Platform",
      "name": "Platform"
    },
  ];



interface Props extends React.Props<LineChart> {
  videogames: Array<VideogameEntity>,
  number?: number
}

export default class LineChart extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="pie-chart">
        <PChart
          data={this.props.videogames}
          width={width}
          height={height}
          chartSeries={chartSeries}
          value={value}
          name={name}
        />
      </div>
    );
  }
}
