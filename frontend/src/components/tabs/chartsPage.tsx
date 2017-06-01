import * as React from 'react';
import VideogameEntity from '../../entities/videogameEntity';
import VideogamesTable from '../common/videogamesTable';
import VideogamesService from '../../services/videogamesService';
import LineChart from '../charts/lineChart';
import BarGroupChart from '../charts/barGroupChart';
import PieChart from '../charts/pieChart';
import VideoGamesPage from './videogamesPage';
import 'react-select/dist/react-select.css';


var autobind = require('autobind-decorator'),
  logo = require('../../../resources/images/logo.png'),
  basicImage = require('../../../resources/images/basic-charts.png'),
  pieImage = require('../../../resources/images/pie-chart.png'),
  barImage = require('../../../resources/images/bar-chart.png'),
  Loader = require('react-loader'),
  DebounceInput = require('react-debounce-input'),
  Select = require('react-select');

var options = [
  { value: 'Platform', label: 'Platform' },
  { value: 'Genre', label: 'Genre' },
  { value: 'Publisher', label: 'Publisher' }
];

interface Props extends React.Props<ChartsPage> { };

export default class ChartsPage extends VideoGamesPage {

  @autobind
  private onGroupSelectedChange(val) {
    var me = this,
      group = val.value;

    me.state.groupSelector = group;
    me.forceUpdate();
    me.loadSelectedGroup();
  }

  @autobind
  private showLineChart() {
    this.state.selectedChart = "Line";
    this.loadGroup("year");
  }

  @autobind
  private showBarChart() {
    this.state.selectedChart = "Bar";
    this.loadSelectedGroup();
  }

  @autobind
  private showPieChart() {
    this.state.selectedChart = "Pie";
    this.loadSelectedGroup();
  }

  private loadGroup(group: string) {
    var me = this;

    me.setLoading(true);
    VideogamesService.promiseGroupBy(group).then(function (groups) {
      me.state.groups = groups;
      debugger
      me.setLoading(false);
    });
  }

  private loadSelectedGroup() {
    var me = this,
      group = me.state.groupSelector;
    me.loadGroup(group);
  }

  @autobind
  private getChartContainer() {
    switch (this.state.selectedChart) {
      case "Line":
        return (
          <div className="charts-container">
            <LineChart
              groups={this.state.groups}/>
          </div>);
      case "Bar":
        return (
          <div className="charts-container">
            <BarGroupChart
              groups={this.state.groups}
              number={10} />
          </div>);
      case "Pie":
        return (
          <div className="charts-container">
            <PieChart
              groups={this.state.groups}
              max={40} />
          </div>)
      default:
        return <div className="charts-container" />
    }
  }

  public render() {
    return (
      <div className="charts-page">
        <div className="main-container">
          <div className="left-container">
            <Select
              name="form-field-name"
              value={this.state.groupSelector}
              options={options}
              onChange={this.onGroupSelectedChange}
            />
            <DebounceInput
              className="form-control videogames-filter"
              placeholder="Filter by Name"
              name="Name"
              value={this.state.nameFilter}
              minLength={2}
              debounceTimeout={300}
              onChange={this.onFilterChange} />


            <input className="image-button" type="image"
              src={basicImage}
              onClick={this.showLineChart} />
            <input className="image-button" type="image"
              src={pieImage}
              onClick={this.showPieChart} />
            <input className="image-button" type="image"
              src={barImage}
              onClick={this.showBarChart} />

            <div className="shape-block">
              <img className="shape" src={logo} />
            </div>
          </div>
          <div className="right-container">
            <Loader loaded={this.state.loaded}>
              {this.getChartContainer()}
            </Loader>
          </div>
        </div>
      </div>
    );
  }
}
