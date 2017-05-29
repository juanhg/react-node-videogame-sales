import * as React from 'react';
import { Link } from 'react-router';
import VideogameEntity from '../../entities/videogameEntity';
var BGChart = require('react-d3-tooltip').BarGroupTooltip;

var width = 700,
  height = 400,
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
  x = function (d) {
    return d.Name;
  },
  xScale = 'ordinal',
  xLabel = 'Games',
  yLabel = 'Sales';


interface Props extends React.Props<BarGroupChart> {
  videogames: Array<VideogameEntity>,
  number?: number
}

export default class BarGroupChart extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="bar-group-chart">
        <BGChart
          title={title}
          data={this.props.number 
          ? this.props.videogames.slice(0, this.props.number) 
          : this.props.videogames }
          width={width}
          height={height}
          chartSeries={chartSeries}
          x={x}
          xScale={xScale}
          xLabel={xLabel}
          yLabel={yLabel}
        />
      </div>
    );
  }
}
