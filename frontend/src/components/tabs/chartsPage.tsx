import * as React from 'react';
import VideogameEntity from '../../entities/videogameEntity';
import VideogamesTable from '../common/videogamesTable';
import VideogamesService from '../../services/videogamesService';
import LineChart from '../charts/lineChart';
import AreaChart from '../charts/areaChart';
import BarGroupChart from '../charts/barGroupChart';
import PieChart from '../charts/pieChart';
import BubbleChart from '../d3/bubbleChart';
import RoundedRect from '../d3/roundedRectangles';
import Waves from '../d3/waves';

import VideoGamesPage from './videogamesPage';
import 'react-select/dist/react-select.css';


var autobind = require('autobind-decorator'),
  logo = require('../../../resources/images/logo.png'),
  basicImage = require('../../../resources/images/basic-charts.png'),
  areaImage = require('../../../resources/images/area-chart.png'),
  pieImage = require('../../../resources/images/pie-chart.png'),
  barImage = require('../../../resources/images/bar-chart.png'),
  waveImage = require('../../../resources/images/waves.png'),
  roundedRectanglesImage = require('../../../resources/images/rounded-rectangles.png'),
  bubbleImage = require('../../../resources/images/bubble-chart.png'),
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

            <div className="chart-buttons-container">

              {
                this.getImageButtonAttributes().map((attr) =>
                  <input className="image-button" type="image"
                    src={attr.src}
                    onClick={attr.onclick} />
                )
              }
            </div>

            <div className="experiment-buttons-container">
              {
                this.getExperimentalImageButtonAttributes().map((attr) =>
                  <input className="image-button" type="image"
                    src={attr.src}
                    onClick={attr.onclick} />
                )
              }
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

  public componentDidMount() {
    this.loadGroup("year");
  }

  private getImageButtonAttributes() {
    var me = this;
    return [
      {
        src: basicImage,
        onclick: me.showLineChart,
      },
      {
        src: areaImage,
        onclick: me.showAreaChart,
      },
      {
        src: pieImage,
        onclick: me.showPieChart,
      },
      {
        src: barImage,
        onclick: me.showBarChart,
      },
      {
        src: bubbleImage,
        onclick: me.showBubbleChart
      }
    ]
  }


  private getExperimentalImageButtonAttributes() {
    var me = this;
    return [
      {
        src: roundedRectanglesImage,
        onclick: me.showRoundedRectangles,
      },
      {
        src: waveImage,
        onclick: me.showWaves,
      },
    ]
  }

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
  private showAreaChart() {
    this.state.selectedChart = "Area";
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

  @autobind
  private showRoundedRectangles() {
    this.state.selectedChart = "RoundedRectangles";
    this.forceUpdate();
  }

  @autobind
  private showWaves() {
    this.state.selectedChart = "Waves";
    this.forceUpdate();
  }

  @autobind
  private showBubbleChart() {
    this.state.selectedChart = "Bubble";
    this.loadSelectedGroup();
  }

  private loadGroup(group: string) {
    var me = this;

    me.setLoading(true);
    VideogamesService.promiseGroupBy(group).then(function (groups) {
      me.state.groups = groups;
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
              groups={this.state.groups} />
          </div>);
      case "Area":
        return (
          <div className="charts-container">
            <AreaChart
              groups={this.state.groups} />
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
      case "RoundedRectangles":
        return (
          <div className="charts-container">
            <RoundedRect />
          </div>)
      case "Bubble":
        return (
          <div className="charts-container">
            <BubbleChart
              groups={this.state.groups} />
          </div>)
      case "Waves":
        return (
          <div className="charts-container">
            <Waves />
          </div>)
      default:
        return <div className="charts-container" />
    }
  }

  @autobind
  protected onFilterChange(event) {
    var me = this,
      filterId = event.target.name,
      filter = event.target.value,
      group = this.state.selectedChart === 'Line' || this.state.selectedChart === 'Area'
        ? 'year'
        : this.state.groupSelector;

    me.state.nameFilter = filter;
    me.setLoading(true);

    if (!filter)
      this.loadSelectedGroup();
    else {
      VideogamesService.promiseGroupByWithFilter(group, filter).then(function (groups) {
        me.state.groups = groups;
        me.setLoading(false);
      });
    }
  }
}
