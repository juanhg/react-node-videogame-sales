import * as React from 'react';
import { Link } from 'react-router';
import VideogameEntity from '../../entities/videogameEntity';
var PChart = require('react-d3-tooltip').PieTooltip;

//TODO replace mocked data with real info

var data = [
  {
    Genre: 'Action',
    Global_Sales: 4
  },
  {
    Genre: 'Adventure',
    Global_Sales: 8
  },
    {
    Genre: 'Fighting',
    Global_Sales: 3
  },
    {
    Genre: 'Misc',
    Global_Sales: 5
  },
    {
    Genre: 'Platform',
    Global_Sales: 2
  }
]

var width = 700,
  height = 400,
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
      <div className="line-chart">
        <PChart
          data={data}
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
