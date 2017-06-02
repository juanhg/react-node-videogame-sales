import * as React from 'react';
import { Link } from 'react-router';
import VideogameEntity from '../../entities/videogameEntity';
import GroupEntity from '../../entities/groupEntity';

var AChart = require('react-d3-tooltip').AreaStackTooltip;

var width = 1400,
  height = 700,
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
    return d._id;
  },
    xScale = 'ordinal';

interface Props extends React.Props<LineChart> {
  groups: Array<GroupEntity>,
  number?: number
}

export default class LineChart extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="line-chart">
        <AChart
          margins={margins}
          title={title}
          data={this.props.number
            ? this.props.groups.slice(0, this.props.number)
            : this.props.groups}
          width={width}
          height={height}
          chartSeries={chartSeries}
          x={x}
          xScale={xScale}
        />
      </div>
    );
  }
}
