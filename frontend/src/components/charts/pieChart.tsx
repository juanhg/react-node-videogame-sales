import * as React from 'react';
import { Link } from 'react-router';
import GroupEntity from '../../entities/groupEntity';

var PChart = require('react-d3-tooltip').PieTooltip,
    autobind = require('autobind-decorator');


//TODO replace mocked data with real info

var width = 1100,
  height = 700;

interface Props extends React.Props<PieChart> {
  groups: Array<GroupEntity>,
  max?: number
}

export default class PieChart extends React.Component<Props, {}> {

  @autobind
  private getChartSeries(){
    var groups = this.props.groups.slice(0, this.props.max);
    return groups.map((group, index) => { 
      return {
        field: group._id,
        name: group._id
      }
    });
  }

  private getName(group){
    return group._id;
  }

  private getValue(group){
    return +group.Global_Sales;
  }

  public render() {
    return (
      <div className="pie-chart">
        <PChart
          data={this.props.groups}
          width={width}
          height={height}
          chartSeries={this.getChartSeries()}
          value={this.getValue}
          name={this.getName}
        />
      </div>
    );
  }
}
