import * as React from 'react';
import VideogameEntity from '../../api/videogameEntity';
import VideogamesAPI from '../../api/videogamesAPI';

var autobind = require('autobind-decorator'),
    logo = require('../../../resources/images/logo.png');

interface Props extends React.Props<ChartsPage> { }

interface State {
  videogames: Array<VideogameEntity>
}

export default class ChartsPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { videogames: [] };
  }

  public componentDidMount() {
    VideogamesAPI.promiseAll().then(function (videogames) {
      this.setState({ videogames: videogames })
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
            UNDER CONSTRUCTION
          </div>
        </div>
      </div>
    );
  }
}
