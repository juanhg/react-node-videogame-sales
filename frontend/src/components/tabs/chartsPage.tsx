import * as React from 'react';
import VideogameEntity from '../../entities/videogameEntity';
import VideogamesAPI from '../../api/videogamesAPI';
import VideogamesTable from '../common/videogamesTable';
import LineChart from '../charts/lineChart';
import BarGroupChart from '../charts/barGroupChart';
import PieChart from '../charts/pieChart';
import VideoGamesPage from './videogamesPage';
import 'react-select/dist/react-select.css';


var autobind = require('autobind-decorator'),
  logo = require('../../../resources/images/logo.png'),
  basicImage = require('../../../resources/images/basic-charts.png'),
  pieImage = require('../../../resources/images/pie-chart.png'),
  Loader = require('react-loader'),
  DebounceInput = require('react-debounce-input'),
  Select = require('react-select');

var options = [
  { value: 'Platform', label: 'Platform' },
  { value: 'Genre', label: 'Genre' },
  { value: 'Publisher', label: 'Publisher' }
];

interface Props extends React.Props<ChartsPage> { }

export default class ChartsPage extends VideoGamesPage {

  @autobind
  private onGroupSelectedChange(val) {
    this.state.groupSelector = val.value;
    this.forceUpdate();
  }

  @autobind
  private showBasicChart() {
    this.state.selectedChart = "Basic";
    this.loadAll();
  }

  @autobind
  private showPieChart() {
    var me = this;
    me.state.selectedChart = "Pie";
    me.setLoading(true);
    VideogamesAPI.promiseGroupByGenre().then(function (videogames) {
      me.state.videogames = videogames;
      me.setLoading(false);
    });
  }

  @autobind
  private getChartContainer() {
    switch (this.state.selectedChart) {
      case "Basic":
        return (
          <div className="charts-container">
            <LineChart
              videogames={this.state.videogames}
              number={20} />
            <BarGroupChart
              videogames={this.state.videogames}
              number={3} />
          </div>);
      case "Pie":
        return (
          <div className="charts-container">
            <PieChart
              videogames={this.state.videogames}
              number={3} />
          </div>)
      default: 
          return <div className="charts-container"/>
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
              onClick={this.showBasicChart} />
            <input className="image-button" type="image"
              src={pieImage}
              onClick={this.showPieChart} />

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
