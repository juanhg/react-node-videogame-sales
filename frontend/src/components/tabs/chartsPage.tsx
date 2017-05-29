import * as React from 'react';
import VideogameEntity from '../../entities/videogameEntity';
import VideogamesAPI from '../../api/videogamesAPI';
import VideogamesTable from '../common/videogamesTable';
import LineChart from '../charts/lineChart';
import BarGroupChart from '../charts/barGroupChart';
import PieChart from '../charts/pieChart';
import VideoGamesPage from './videogamesPage';


var autobind = require('autobind-decorator'),
  logo = require('../../../resources/images/logo.png'),
  Loader = require('react-loader'),
  DebounceInput = require('react-debounce-input');

export default class ChartsPage extends VideoGamesPage {
  public render() {
    return (
      <div className="charts-page">
        <div className="main-container">
          <div className="left-container">
            <DebounceInput
              className="form-control videogames-filter"
              placeholder="Filter by Name"
              name="Name"
              value={this.state.nameFilter}
              minLength={2}
              debounceTimeout={300}
              onChange={this.onFilterChange} />
            <div className="shape-block">
              <img className="shape" src={logo} />
            </div>
          </div>
          <div className="right-container">
            <Loader loaded={this.state.loaded}>
              <div className="charts-container">
                <LineChart
                  videogames={this.state.videogames}
                  number={20} />
                <BarGroupChart
                  videogames={this.state.videogames}
                  number={3} />
                <PieChart
                  videogames={this.state.videogames}
                  number={3} />
              </div>
            </Loader>
          </div>
        </div>
      </div>
    );
  }
}
