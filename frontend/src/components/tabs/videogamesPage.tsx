import * as React from 'react';
import { Link } from 'react-router';

import VideogameEntity from '../../api/videogameEntity';
import VideogamesAPI from '../../api/videogamesAPI';
import Toogle from '../common/toogle';

var Loader = require('react-loader'),
  DebounceInput = require('react-debounce-input'),
  autobind = require('autobind-decorator'),
  logo = require('../../../resources/images/logo.png');

interface Props extends React.Props<VideogamesPage> { }

interface State {
  filterText: string,
  filterByName: boolean,
  filterByGenre: boolean,
  videogames: Array<VideogameEntity>,
  loaded: boolean
}

export default class VideogamesPage extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      filterText: "",
      filterByName: true,
      filterByGenre: false,
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

  @autobind
  public onInputChange(event) {
    var filter = event.target.value;
    this.state.filterText = filter;
    this.setLoading(true);

    VideogamesAPI.promiseFindByFilter(filter).then(function (videogames) {
      this.state.videogames = videogames;
      this.setLoading(false);
    }.bind(this))
  }

  @autobind
  public onToogleChange(event) {
    this.state.filterByGenre = !this.state.filterByGenre;
    this.state.filterByName = !this.state.filterByName;
    this.forceUpdate();    
  }

  @autobind
  public setLoading(enabled){
    this.state.loaded = !enabled;
    this.forceUpdate();
  }

  public render() {
    return (
      <div className="charts-page">
        <div className="main-container">
          <div className="left-container">
            <DebounceInput
              className="form-control"
              value={this.state.filterText}
              minLength={2}
              debounceTimeout={300}
              onChange={this.onInputChange} />
            <Toogle
              value={this.state.filterByName}
              onToogle={this.onToogleChange}
            />
            <Toogle
              value={this.state.filterByGenre}
              onToogle={this.onToogleChange} />
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
