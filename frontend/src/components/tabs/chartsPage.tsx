import * as React from 'react';
import VideogameEntity from '../../entities/videogameEntity';
import VideogamesAPI from '../../api/videogamesAPI';
import VideogamesTable from '../common/videogamesTable';
import LineChart from '../charts/LineChart';
import BarGroupChart from '../charts/BarGroupChart';

var autobind = require('autobind-decorator'),
  logo = require('../../../resources/images/logo.png'),
  Loader = require('react-loader');

interface Props extends React.Props<ChartsPage> { }

interface State {
  videogames: Array<VideogameEntity>,
  loaded: boolean
}

export default class ChartsPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      videogames: [],
      loaded: false,
    };
  }

  public componentDidMount() {
    VideogamesAPI.promiseAll().then(function (videogames) {
      this.setState({
        videogames: videogames.slice(0, 100),
        loaded: true,
        settings: this.state.settings
      });
    }.bind(this))
  }

  public render() {
    return (
      <div className="charts-page">
        <div className="main-container">
          <div className="left-container">
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
                <BarGroupChart
                  videogames={this.state.videogames}
                  number={3} />
                <BarGroupChart
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
