import * as React from 'react';
import { Link } from 'react-router';

import VideogameEntity from '../../api/videogameEntity';
import VideogamesAPI from '../../api/videogamesAPI';

var Loader = require('react-loader'),
    logo = require('../../../resources/images/logo.png');


interface Props extends React.Props<VideogamesPage> { }

interface State {
  videogames: Array<VideogameEntity>,
  loaded: boolean
}


export default class VideogamesPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      videogames: [],
      loaded: false
    };
  }

  public componentDidMount() {
    VideogamesAPI.promiseAll().then(function (videogames) {
      this.setState({
        videogames: videogames,
        loaded: true
      });
    }.bind(this));
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
              {
                this.state.videogames.map((videogame: VideogameEntity) =>
                  <div> {videogame.Name} </div>
                )
              }
            </Loader>
          </div>
        </div>
      </div>
    );
  }
}
