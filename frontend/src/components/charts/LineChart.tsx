import * as React from 'react';
import { Link } from 'react-router';
import VideogameEntity from '../../entities/videogameEntity';
var LChart = require('react-d3-tooltip').LineTooltip;

var width = 700,
  height = 300,
  margins = { left: 100, right: 100, top: 50, bottom: 50 },
  title = "Videogames Sales",
  chartSeries = [
    {
      field: 'NA_Sales',
      name: 'North America sales',
    },
    {
      field: 'EU_Sales',
      name: 'Europe sales',
    },
    {
      field: 'JP_Sales',
      name: 'Japan sales',
    },
    {
      field: 'Global_Sales',
      name: 'Sales',
    }
  ],
  // your x accessor
  x = function (d) {
    return d.Rank;
  }

interface Props extends React.Props<LineChart> {
  videogames: Array<VideogameEntity>,
  number?: number
}

export default class LineChart extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="line-chart">
        <LChart
          margins={margins}
          title={title}
          data={this.props.number
            ? this.props.videogames.slice(0, this.props.number)
            : this.props.videogames}
          width={width}
          height={height}
          chartSeries={chartSeries}
          x={x}
        />
      </div>
    );
  }
}
